'use client';

import React, { useMemo, useState } from 'react';
import newsimg from '../../Assets/Images/news-img.jpg';
import { PostCreateOurNewLetter } from '@/services/Manage_services';

const OurNewsletter: React.FC = () => {
  const [contactMethod, setContactMethod] = useState<string>('email');
  const [email, setEmail] = useState<string>('');
  const [whatsapp, setWhatsapp] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const contactOptions = useMemo(
    () => [
      { id: 'emailOption', label: 'Through Email', value: 'email' },
      { id: 'whatsappOption', label: 'Through WhatsApp', value: 'whatsapp' },
    ],
    []
  );

  const newsletterContent = useMemo(
    () => ({
      title: 'Get in touch',
      heading: 'Latest',
      highlight: 'Fatawas',
      subheading: 'right on your inbox.',
      description:
        'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.',
      emailPlaceholder: 'Enter your email',
      whatsappPlaceholder: 'Enter your WhatsApp number',
      emailDisclaimer: "Your email is safe with us, We don't Spam.",
      whatsappDisclaimer: "We’ll only send important updates on WhatsApp.",
    }),
    []
  );

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContactMethod(e.target.value);
    setEmail('');
    setWhatsapp('');
    setSubmitted(false);
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitted(false);

    try {
      if ((contactMethod === 'email' && email) || (contactMethod === 'whatsapp' && /^\d{10}$/.test(whatsapp))) {
        const requestData = {
          EmailID: contactMethod === 'email' ? email : '',
          MobileNo: contactMethod === 'whatsapp' ? whatsapp : '',
        };

        const response = await PostCreateOurNewLetter(requestData);

        if (response?.success) {
          console.log('Subscribed:', requestData);
          setSubmitted(true);
          setEmail('');
          setWhatsapp('');
        } else {
          throw new Error(response?.message || 'Subscription failed');
        }
      } else {
        setError('Please enter valid details.');
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Something went wrong. Please try again.');
    }
  };

  return (
    <section className="newsletter">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="newsletter-title">
              <i className="fa fa-file-text" aria-hidden="true"></i> Our Newsletter
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-12 col-lg-6">
            <div className="news-img">
              <img src={newsimg.src} className="img-fluid" alt="Newsletter" />
            </div>
          </div>

          <div className="col-12 col-lg-6">
            <div className="get-in-touch-content">
              <h2>{newsletterContent.title}</h2>

              <div className="d-flex pb-3" style={{ gap: '25px' }}>
                {contactOptions.map((option) => (
                  <div className="bg-sty" key={option.id}>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="contactOption"
                        id={option.id}
                        value={option.value}
                        checked={contactMethod === option.value}
                        onChange={handleRadioChange}
                      />
                      <label className="form-check-label" htmlFor={option.id}>
                        {option.label}
                      </label>
                    </div>
                  </div>
                ))}
              </div>

              <div className="news-subscribe">
                <h1>
                  {newsletterContent.heading}{' '}
                  <span className="fatw-txt">{newsletterContent.highlight}</span>{' '}
                  {newsletterContent.subheading}
                </h1>
                <p className="mb-4">{newsletterContent.description}</p>

                <form className="subscribe_form" onSubmit={handleSubmit}>
                  <div className="input-group">
                    {contactMethod === 'email' ? (
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        placeholder={newsletterContent.emailPlaceholder}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    ) : (
                      <input
                        type="tel"
                        className="form-control"
                        name="whatsapp"
                        placeholder={newsletterContent.whatsappPlaceholder}
                        value={whatsapp}
                        onChange={(e) => {
                          const value = e.target.value;
                          if (/^\d{0,10}$/.test(value)) {
                            setWhatsapp(value);
                          }
                        }}
                        pattern="\d{10}"
                        title="Please enter a valid 10-digit WhatsApp number"
                        required
                      />
                    )}
                    <button className="btn btn-subscribe" type="submit">
                      <i className="fa fa-paper-plane" aria-hidden="true"></i>
                    </button>
                  </div>

                  <p className="email-text mb-0 pt-2">
                    {contactMethod === 'email'
                      ? newsletterContent.emailDisclaimer
                      : newsletterContent.whatsappDisclaimer}
                  </p>
                </form>

                {submitted && (
                  <div className="alert alert-success mt-3" role="alert">
                    Thank you for subscribing!
                  </div>
                )}
                {error && (
                  <div className="alert alert-danger mt-3" role="alert">
                    {error}
                  </div>
                )}
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurNewsletter;
