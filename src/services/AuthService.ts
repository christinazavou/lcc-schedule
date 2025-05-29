class AuthService {
  private readonly base_url;

  constructor() {
    const currentHost = window.location.hostname;

    // Validate the origin
    if (!`${process.env.ALLOWED_HOSTS}`.includes(currentHost)) {
      // console.warn(
      //   `Untrusted origin: ${currentHost}. Defaulting to BACKEND_HOST.`
      // );
      this.base_url = `https://${process.env.BACKEND_HOST}/api`;
    } else {
      // console.warn(`Trusted origin: ${currentHost}. Using it for backend api.`);
      if (currentHost === 'localhost') {
        this.base_url = `http://localhost/api`;
      } else {
        this.base_url = `https://${currentHost}/api`;
      }
    }
  }

  async signup(
    username: string,
    email: string,
    password: string
  ): Promise<void> {
    try {
      const url = `${this.base_url}/auth/signup`;

      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: username,
          email: email,
          roles: ['user', 'mod'],
          password: password,
        }),
      });

      if (!response.ok) {
        console.log(response);
        throw new Error('Sign up failed');
      }

      //   const data = await response.json();
      //   localStorage.setItem('token', data.token); // Store JWT
      alert('Sign up successful!');
      // Redirect to protected page if needed
    } catch (err) {
      alert('Sign up error');
      console.error(err);
    }
  }

  async login(username: string, password: string): Promise<void> {
    const url = `${this.base_url}/auth/signin`;
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });

    if (!response.ok) {
      console.log(response);
      throw new Error('Login failed');
    }

    const data = await response.json();
    localStorage.setItem('authToken', data.token); // Store JWT
  }
}

const authService = new AuthService();

export default authService;
