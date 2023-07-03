'use client';

import { Button, Container, Heading, Stack } from '@chakra-ui/react';
import { useLogoutMutation } from '@/hooks';
import { useRouter } from 'next/navigation';
import { useAuthenticatedUserContext } from '@/context';
import Image from 'next/image';

export default function Home() {
  const logout = useLogoutMutation();
  const router = useRouter();
  const user = useAuthenticatedUserContext();

  const handleAuth = () => {
    if (user) return logout.mutate();
    return router.push('/auth/login');
  };

  if (user)
    return (
      <Stack spacing={3}>
        <Heading>Welcome,</Heading>
        <Heading size="md" as="h3">
          {user.email}
        </Heading>
        <Button colorScheme="blue" onClick={handleAuth} isLoading={logout.isLoading}>
          Logout
        </Button>
      </Stack>
    );

  return (
    <div>
      <div
        style={{
          display: 'flex',
        }}
      >
        <div
          style={{
            width: '50%',
            backgroundColor: '#ebf8ff',
            paddingTop: '4rem',
            paddingBottom: '4rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '1rem',
          }}
        >
          <h3
            style={{
              fontSize: '3rem',
              fontWeight: 700,
              lineHeight: '1.2',
              color: '#2d3748',
            }}
          >
            Find Highly Rated <br /> Family Doctors <br />
            Easily
          </h3>
          <p
            style={{
              marginLeft: '4rem',
              textAlign: 'center',
            }}
          >
            Select you doctor and preferred slot to book your appointment
          </p>
          <div
            style={{
              backgroundColor: 'white',
              borderRadius: '8px',
              display: 'flex',
              padding: '1rem',
              gap: '1rem',
              flexDirection: 'column',
              marginTop: '2rem',
            }}
          >
            <p
              style={{
                fontWeight: 700,
                fontSize: '1.25rem',
              }}
            >
              Book Your Appointment
            </p>
            <form
              style={{
                display: 'flex',
                gap: '2rem',
                alignItems: 'center',
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
            </form>
          </div>
        </div>
        <div
          style={{
            width: '50%',
            backgroundColor: '#3182ce',
            paddingTop: '4rem',
            paddingBottom: '4rem',
          }}
        >
          <Image
            src="https://thumbs.dreamstime.com/z/funny-clown-doctor-isolated-white-background-89615687.jpg"
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
                  stroke-width="1.5"
                  stroke="currentColor"
                  style={{
                    width: '3rem',
                    height: '3rem',
                  }}
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
                  />
                </svg>
              </div>
              <h6>Find Your Doctor</h6>
              <small>Choose from a variety of medical specialties.</small>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                alignItems: 'center',
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
                  stroke-width="1.5"
                  stroke="currentColor"
                  style={{
                    width: '3rem',
                    height: '3rem',
                  }}
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
                  />
                </svg>
              </div>
              <h6>Find Your Doctor</h6>
              <small>Choose from a variety of medical specialties.</small>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                alignItems: 'center',
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
                  stroke-width="1.5"
                  stroke="currentColor"
                  style={{
                    width: '3rem',
                    height: '3rem',
                  }}
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
                  />
                </svg>
              </div>
              <h6>Find Your Doctor</h6>
              <small>Choose from a variety of medical specialties.</small>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                alignItems: 'center',
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
                  stroke-width="1.5"
                  stroke="currentColor"
                  style={{
                    width: '3rem',
                    height: '3rem',
                  }}
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
                  />
                </svg>
              </div>
              <h6>Find Your Doctor</h6>
              <small>Choose from a variety of medical specialties.</small>
            </div>
          </div>
        </div>
        <div
          style={{
            backgroundColor: 'rgba(66,153,225,0.3)',
            borderRadius: '8px',
            display: 'flex',
            padding: '4rem',
            justifyContent: 'space-around',
          }}
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
              gap: '4rem',
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
              }}
            >
              <li>Find Your Specialist</li>
              <li>Describe your problem</li>
              <li>Set up a meeting</li>
              <li>Book your time</li>
              <button
                style={{
                  padding: '1rem',
                  backgroundColor: 'rgba(66,153,225,0.9)',
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
        <div
          style={{
            backgroundColor: 'rgba(66,153,225,0.3)',
            borderRadius: '8px',
            display: 'flex',
            padding: '4rem',
            justifyContent: 'space-around',
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
                fontSize: '1.5rem',
              }}
            >
              We offer a wide range <br /> of specialists for your health
            </h6>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2,1fr)',
                gridTemplateRows: 'repeat(2,1fr)',
                gap: '0.5rem',
              }}
            >
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
                    stroke-width="1.5"
                    stroke="currentColor"
                    style={{
                      width: '2rem',
                      height: '2rem',
                    }}
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
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
                    stroke-width="1.5"
                    stroke="currentColor"
                    style={{
                      width: '2rem',
                      height: '2rem',
                    }}
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
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
                    stroke-width="1.5"
                    stroke="currentColor"
                    style={{
                      width: '2rem',
                      height: '2rem',
                    }}
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
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
                    stroke-width="1.5"
                    stroke="currentColor"
                    style={{
                      width: '2rem',
                      height: '2rem',
                    }}
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
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
          <div>
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
              }}
            />
          </div>
        </div>
        <footer
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '1rem',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '2rem',
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
            <div>
              <p
                style={{
                  fontWeight: 'bold',
                  fontSize: '0.75rem',
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  style={{
                    width: '2rem',
                    height: '2rem',
                  }}
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  style={{
                    width: '2rem',
                    height: '2rem',
                  }}
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
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
