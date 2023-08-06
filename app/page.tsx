'use client';

import { useEffect, useState } from 'react';
import { useLogoutMutation } from '@/hooks';
import { useRouter } from 'next/navigation';
import { useAuthenticatedUserContext } from '@/context';
import Image from 'next/image';
import dynamic from 'next/dynamic';

function Home() {
  const logout = useLogoutMutation();
  const router = useRouter();
  const user = useAuthenticatedUserContext();

  const handleAuth = () => {
    if (user) return logout.mutate();
    return router.push('/auth/login');
  };

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial check

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div>
      <div
        id="home_container"
        style={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: 'center',
          padding: isMobile ? '1rem' : '2rem',
        }}
      >
        <div style={{ flex: 1 }}>
          <h3
            style={{
              fontSize: isMobile ? '2rem' : '3rem',
              fontWeight: 700,
              lineHeight: '1.2',
              color: '#2d3748',
              textAlign: isMobile ? 'center' : 'left', // Center the heading for mobile view
              marginBottom: isMobile ? '1rem' : 0, // Add margin at the bottom for better spacing on mobile
            }}
          >
            Find Highly Rated <br /> Family Doctors <br />
            Easily
          </h3>
          <p
            style={{
              textAlign: isMobile ? 'center' : 'left',
              marginLeft: isMobile ? '0' : '4rem',
            }}
          >
            Select your doctor and preferred slot to book your appointment
          </p>
          <div
            style={{
              backgroundColor: 'white',
              borderRadius: '8px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: isMobile ? 'center' : 'stretch',
              padding: '1rem',
              gap: '1rem',
              marginTop: '2rem',
            }}
          >
            <p
              style={{
                fontWeight: 700,
                fontSize: '1.25rem',
                textAlign: isMobile ? 'center' : 'left',
              }}
            >
              Book Your Appointment
            </p>
            <form
              style={{
                display: 'flex',
                flexDirection: isMobile ? 'column' : 'row',
                gap: '2rem',
                alignItems: 'center',
                flexWrap: 'wrap',
                justifyContent: 'center',
              }}
            >
              <section>
                <select name="speciality" id="speciality" placeholder="Speciality">
                  <option value="speciality">Speciality</option>
                </select>
              </section>
              <section>
                <select name="location" id="location" placeholder="Location">
                  <option value="location">Location</option>
                </select>
              </section>
              <section>
                <input type="date" name="date" id="date" />
              </section>
              <div>
                <button
                  type="button"
                  style={{
                    padding: '0.5rem',
                    backgroundColor: 'rgba(66,153,225,0.9)',
                    borderRadius: '8px',
                    color: 'white',
                    fontWeight: 'bold',
                  }}
                >
                  Book an Appointment
                </button>
              </div>
            </form>
          </div>
        </div>

        <div
          style={{
            textAlign: 'center',
            height: isMobile ? '400px' : '630px',
            marginTop: isMobile ? '2rem' : 0,
          }}
        >
          <img
            src="https://thumbs.dreamstime.com/z/funny-clown-doctor-isolated-white-background-89615687.jpg"
            alt="Clown"
            height={800}
            width={500}
            style={{
              display: 'block',
              marginLeft: 'auto',
              marginRight: 'auto',
              borderRadius: '75%',
            }}
          />
        </div>
      </div>
      <div
        style={{
          padding: '4rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '4rem',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '4rem',
          }}
        >
          <h4
            style={{
              fontSize: '2rem',
              fontWeight: 700,
              lineHeight: '1.2',
              color: '#2d3748',
              textAlign: 'center',
            }}
          >
            How It Works
          </h4>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '2rem',
              alignItems: 'center',
              justifyContent: 'space-around',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                alignItems: 'center',
                minWidth: '200px',
              }}
            >
              <div
                style={{
                  padding: '1rem',
                  backgroundColor: 'rgba(66,153,225,0.3)',
                  width: 'fit-content',
                  borderRadius: '50%',
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  style={{
                    width: '3rem',
                    height: '3rem',
                  }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
                  />
                </svg>
              </div>
              <h6>Find Your Doctor</h6>
              <small style={{ textAlign: isMobile ? 'center' : 'left' }}>
                Choose from a variety of medical specialties.
              </small>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                alignItems: 'center',
                minWidth: '200px',
              }}
            >
              <div
                style={{
                  padding: '1rem',
                  backgroundColor: 'rgba(66,153,225,0.3)',
                  width: 'fit-content',
                  borderRadius: '50%',
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  style={{
                    width: '3rem',
                    height: '3rem',
                  }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14 12H9m5 0l-1.5-1.5M9 12L7.5 13.5"
                  />
                </svg>
              </div>
              <h6>Book an Appointment</h6>
              <small style={{ textAlign: isMobile ? 'center' : 'left' }}>
                Schedule a convenient appointment time.
              </small>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                alignItems: 'center',
                minWidth: '200px',
              }}
            >
              <div
                style={{
                  padding: '1rem',
                  backgroundColor: 'rgba(66,153,225,0.3)',
                  width: 'fit-content',
                  borderRadius: '50%',
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  style={{
                    width: '3rem',
                    height: '3rem',
                  }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
              </div>
              <h6>Receive Medical Care</h6>
              <small style={{ textAlign: isMobile ? 'center' : 'left' }}>
                Get personalized care from top professionals.
              </small>
            </div>
          </div>
        </div>

        <div
          style={{
            backgroundColor: isMobile ? 'rgba(255,255,255)' : 'rgba(66, 153, 225, 0.3)',
            borderRadius: '8px',
            display: 'flex',
            padding: '4rem',
            justifyContent: 'space-around',
          }}
          className="booking_made_easy"
        >
          <div>
            <Image
              src="https://thumbs.dreamstime.com/z/funny-clown-businessman-white-background-172900433.jpg"
              alt="Clown"
              height={800}
              width={500}
              quality={100}
              style={{
                marginLeft: 'auto',
                marginRight: 'auto',
                borderRadius: '75%',
              }}
            />
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              justifyContent: 'center',
            }}
          >
            <h6
              style={{
                textAlign: 'center',
                fontWeight: 'bold',
                fontSize: '1.5rem',
              }}
            >
              Booking made easy
            </h6>
            <ul
              style={{
                listStyle: 'none',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                alignItems: 'center',
                textAlign: 'center',
              }}
            >
              <li>Find Your Specialist</li>
              <li>Describe your problem</li>
              <li>Set up a meeting</li>
              <li>Book your time</li>
              <button
                style={{
                  padding: '1rem',
                  backgroundColor: 'rgba(66, 153, 225, 0.9)',
                  borderRadius: '8px',
                  color: 'white',
                  fontWeight: 'bold',
                  marginTop: '2rem',
                }}
              >
                Book an Appointment
              </button>
            </ul>
          </div>
        </div>

        <div>
          <div
            className="offers_container"
            style={{
              backgroundColor: isMobile ? 'rgba(255,255,255,255)' : 'rgba(66,153,225,0.3)',
              borderRadius: '8px',
              display: 'flex',
              gap: isMobile ? '8px' : '16px',
              padding: isMobile ? '0rem' : '4rem',
              justifyContent: 'space-around',
              flexDirection: isMobile ? 'column' : 'row',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '4rem',
                justifyContent: 'center',
              }}
            >
              <h6
                style={{
                  textAlign: 'center',
                  fontWeight: 'bold',
                  fontSize: isMobile ? '1.rem' : '1.5rem',
                }}
              >
                We offer a wide range <br /> of specialists for your health
              </h6>
              <div className="speciality">
                <div
                  style={{
                    backgroundColor: 'white',
                    padding: '1rem',
                    borderRadius: '4px',
                    display: 'flex',
                    gap: '1rem',
                    alignItems: isMobile ? 'center' : 'center',
                  }}
                >
                  <div
                    style={{
                      backgroundColor: 'rgba(66,153,225,0.2)',
                      padding: '0.5rem',
                      borderRadius: '50%',
                      width: 'fit-content',
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      style={{
                        width: '2rem',
                        height: '2rem',
                      }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <span>Dentistry</span>
                </div>
                <div
                  style={{
                    backgroundColor: 'white',
                    padding: '1rem',
                    borderRadius: '4px',
                    display: 'flex',
                    gap: '1rem',
                    alignItems: 'center',
                  }}
                >
                  <div
                    style={{
                      backgroundColor: 'rgba(66,153,225,0.2)',
                      padding: '0.5rem',
                      borderRadius: '50%',
                      width: 'fit-content',
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      style={{
                        width: '2rem',
                        height: '2rem',
                      }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <span>General Health</span>
                </div>
                <div
                  style={{
                    backgroundColor: 'white',
                    padding: '1rem',
                    borderRadius: '4px',
                    display: 'flex',
                    gap: '1rem',
                    alignItems: 'center',
                  }}
                >
                  <div
                    style={{
                      backgroundColor: 'rgba(66,153,225,0.2)',
                      padding: '0.5rem',
                      borderRadius: '50%',
                      width: 'fit-content',
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      style={{
                        width: '2rem',
                        height: '2rem',
                      }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <span>Phychiatry</span>
                </div>
                <div
                  style={{
                    backgroundColor: 'white',
                    padding: '1rem',
                    borderRadius: '4px',
                    display: 'flex',
                    gap: '1rem',
                    alignItems: 'center',
                  }}
                >
                  <div
                    style={{
                      backgroundColor: 'rgba(66,153,225,0.2)',
                      padding: '0.5rem',
                      borderRadius: '50%',
                      width: 'fit-content',
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      style={{
                        width: '2rem',
                        height: '2rem',
                      }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <span>Neurology</span>
                </div>
              </div>
              <button
                style={{
                  textAlign: 'left',
                }}
              >
                Show More
              </button>
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <Image
                src="https://thumbs.dreamstime.com/z/scary-clown-doctor-playing-performance-children-isolated-red-background-colourful-make-up-face-white-medical-coat-209212241.jpg"
                alt="Clown"
                height={800}
                width={500}
                quality={100}
                style={{
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  borderRadius: '75%',
                  objectFit: 'cover',
                }}
              />
            </div>
          </div>
        </div>

        <footer
          style={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            justifyContent: 'space-between',
            padding: '1rem',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
            }}
          >
            <div
              style={{
                display: 'flex',
                gap: '1rem',
                alignItems: 'center',
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                style={{
                  height: '2rem',
                  width: '2rem',
                }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5"
                />
              </svg>
              <span>Find a Family Doctor</span>
            </div>
            <div className="follow_us">
              <p
                style={{
                  fontWeight: 'bold',
                  fontSize: '0.75rem',
                  alignSelf: 'start',
                }}
              >
                Follow Us
              </p>
              <div
                style={{
                  display: 'flex',
                  gap: '1rem',
                  alignItems: 'center',
                }}
              >
                <a href="https://www.facebook.com/your-page-link" target="_blank" rel="noopener noreferrer">
                  <img
                    src="./../images/facebook.png"
                    alt="Facebook Logo"
                    style={{
                      width: '2rem',
                      height: '2rem',
                    }}
                  />
                </a>
                <a href="https://www.instagram.com/your-page-link" target="_blank" rel="noopener noreferrer">
                  <img
                    src="./../images/instagram.png"
                    alt="Instagram Logo"
                    style={{
                      width: '2rem',
                      height: '2rem',
                    }}
                  />
                </a>
                <a href="https://www.twitter.com/your-page-link" target="_blank" rel="noopener noreferrer">
                  <img
                    src="./../images/twitter.png"
                    alt="Twitter Logo"
                    style={{
                      width: '2rem',
                      height: '2rem',
                    }}
                  />
                </a>
                <a href="https://www.twitter.com/your-page-link" target="_blank" rel="noopener noreferrer">
                  <img
                    src="./../images/linkedin.png"
                    alt="Linkedin Logo"
                    style={{
                      width: '2rem',
                      height: '2rem',
                    }}
                  />
                </a>
              </div>
            </div>

          </div>
          <div
            style={{
              display: 'flex',
              gap: '4rem',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
              }}
            >
              <p
                style={{
                  fontWeight: 'bold',
                  fontSize: '0.75rem',
                }}
              >
                Company
              </p>
              <ul
                style={{
                  listStyle: 'none',
                  fontSize: '0.75rem',
                }}
              >
                <li>About Us</li>
                <li>Terms of Service</li>
                <li>Privacy Policy</li>
              </ul>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
              }}
            >
              <p
                style={{
                  fontWeight: 'bold',
                  fontSize: '0.75rem',
                }}
              >
                Community
              </p>
              <ul
                style={{
                  listStyle: 'none',
                  fontSize: '0.75rem',
                }}
              >
                <li>Specialists</li>
                <li>Patients</li>
                <li>Blog</li>
              </ul>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
              }}
            >
              <p
                style={{
                  fontWeight: 'bold',
                  fontSize: '0.75rem',
                }}
              >
                Help
              </p>
              <ul
                style={{
                  listStyle: 'none',
                  fontSize: '0.75rem',
                }}
              >
                <li>Support</li>
                <li>FAQ</li>
                <li>Mobile App</li>
              </ul>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default dynamic(() => Promise.resolve(Home), {
  ssr: false,
})