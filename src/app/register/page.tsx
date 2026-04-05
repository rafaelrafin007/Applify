"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
        }),
      });

      const data = (await response.json().catch(() => null)) as
        | {
            error?: string;
            details?: Record<string, string[]>;
          }
        | null;

      if (!response.ok) {
        const firstFieldError =
          data?.details &&
          Object.values(data.details).find((messages) => Array.isArray(messages) && messages.length > 0)?.[0];

        setErrorMessage(firstFieldError ?? data?.error ?? "Registration failed");
        return;
      }

      setSuccessMessage("Registration successful. Redirecting to login...");
      setTimeout(() => {
        router.push("/login");
      }, 900);
    } catch {
      setErrorMessage("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="_social_registration_wrapper _layout_main_wrapper">
      <div className="_shape_one">
        <img src="/assets/images/shape1.svg" alt="" className="_shape_img" />
        <img src="/assets/images/dark_shape.svg" alt="" className="_dark_shape" />
      </div>
      <div className="_shape_two">
        <img src="/assets/images/shape2.svg" alt="" className="_shape_img" />
        <img
          src="/assets/images/dark_shape1.svg"
          alt=""
          className="_dark_shape _dark_shape_opacity"
        />
      </div>
      <div className="_shape_three">
        <img src="/assets/images/shape3.svg" alt="" className="_shape_img" />
        <img
          src="/assets/images/dark_shape2.svg"
          alt=""
          className="_dark_shape _dark_shape_opacity"
        />
      </div>

      <div className="_social_registration_wrap">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12">
              <div className="_social_registration_right">
                <div className="_social_registration_right_image">
                  <img src="/assets/images/registration.png" alt="Registration visual" />
                </div>
                <div className="_social_registration_right_image_dark">
                  <img src="/assets/images/registration1.png" alt="Registration visual dark" />
                </div>
              </div>
            </div>

            <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12">
              <div className="_social_registration_content">
                <div className="_social_registration_right_logo _mar_b28">
                  <img src="/assets/images/logo.svg" alt="App logo" className="_right_logo" />
                </div>
                <p className="_social_registration_content_para _mar_b8">Get Started Now</p>
                <h4 className="_social_registration_content_title _titl4 _mar_b50">Registration</h4>

                <button
                  type="button"
                  className="_social_registration_content_btn _mar_b40"
                  disabled
                  aria-disabled="true"
                  title="Google sign-up is out of scope for this task."
                >
                  <img src="/assets/images/google.svg" alt="Google" className="_google_img" />
                  <span>Register with google</span>
                </button>

                <div className="_social_registration_content_bottom_txt _mar_b40">
                  <span>Or</span>
                </div>

                <form className="_social_registration_form" onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                      <div className="_social_registration_form_input _mar_b14">
                        <label className="_social_registration_label _mar_b8" htmlFor="firstName">
                          First Name
                        </label>
                        <input
                          id="firstName"
                          type="text"
                          className="form-control _social_registration_input"
                          value={firstName}
                          onChange={(event) => setFirstName(event.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                      <div className="_social_registration_form_input _mar_b14">
                        <label className="_social_registration_label _mar_b8" htmlFor="lastName">
                          Last Name
                        </label>
                        <input
                          id="lastName"
                          type="text"
                          className="form-control _social_registration_input"
                          value={lastName}
                          onChange={(event) => setLastName(event.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                      <div className="_social_registration_form_input _mar_b14">
                        <label className="_social_registration_label _mar_b8" htmlFor="email">
                          Email
                        </label>
                        <input
                          id="email"
                          type="email"
                          className="form-control _social_registration_input"
                          value={email}
                          onChange={(event) => setEmail(event.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                      <div className="_social_registration_form_input _mar_b14">
                        <label className="_social_registration_label _mar_b8" htmlFor="password">
                          Password
                        </label>
                        <input
                          id="password"
                          type="password"
                          className="form-control _social_registration_input"
                          value={password}
                          onChange={(event) => setPassword(event.target.value)}
                          required
                        />
                      </div>
                    </div>

                  </div>

                  <div className="row">
                    <div className="col-lg-12 col-xl-12 col-md-12 col-sm-12">
                      <div className="form-check _social_registration_form_check">
                        <input
                          className="form-check-input _social_registration_form_check_input"
                          type="checkbox"
                          name="terms"
                          id="terms"
                          defaultChecked
                        />
                        <label
                          className="form-check-label _social_registration_form_check_label"
                          htmlFor="terms"
                        >
                          I agree to terms &amp; conditions
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-lg-12 col-md-12 col-xl-12 col-sm-12">
                      <div className="_social_registration_form_btn _mar_t40 _mar_b60">
                        <button
                          type="submit"
                          className="_social_registration_form_btn_link _btn1"
                          disabled={isLoading}
                          aria-disabled={isLoading}
                        >
                          {isLoading ? "Registering..." : "Register now"}
                        </button>
                      </div>
                    </div>
                  </div>

                  {errorMessage ? (
                    <p className="_social_registration_content_para _mar_b16" role="alert">
                      {errorMessage}
                    </p>
                  ) : null}
                  {successMessage ? (
                    <p className="_social_registration_content_para _mar_b16">{successMessage}</p>
                  ) : null}
                </form>

                <div className="row">
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                    <div className="_social_registration_bottom_txt">
                      <p className="_social_registration_bottom_txt_para">
                        Already have an account? <a href="/login">Login</a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
