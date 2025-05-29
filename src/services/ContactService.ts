class ApiService {
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

  async sendEmail(
    name: string,
    email: string,
    message: string
  ): Promise<string> {
    const url = `${this.base_url}/contact?name=${encodeURIComponent(name)}&email=${process.env.ADMIN_EMAIL}&message=${encodeURIComponent(message)} send from ${encodeURIComponent(email)}`;

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to send email: ${response.statusText}`);
      }

      return await response.text();
    } catch (error: any) {
      // console.error('Error in sendEmail:', error);
      throw error; // Re-throw the error for the component to handle
    }
  }
}

const apiService = new ApiService();

export default apiService;
