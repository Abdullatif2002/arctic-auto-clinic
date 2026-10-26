function App() {
  return (
    <div className="min-h-screen bg-white text-[#172b35]">
      {/* Sticky Navbar */}
      <header className="sticky top-0 z-50 flex min-h-[82px] items-center justify-between gap-7 border-b border-[#edf0f0] bg-white/95 px-[7%] shadow-sm backdrop-blur-md max-md:flex-wrap max-md:px-[5%] max-md:py-5">
        <a
          href="#home"
          className="whitespace-nowrap font-['Manrope'] text-[25px] font-extrabold tracking-[-1.2px]"
        >
          Arctic<span className="text-[#e66b3c]">Auto</span>
        </a>

        <nav className="flex items-center gap-7 max-md:order-3 max-md:w-full max-md:justify-center max-md:gap-5">
          <a href="#home" className="text-sm text-[#52616a] transition hover:text-[#e66b3c]">Home</a>
          <a href="#services" className="text-sm text-[#52616a] transition hover:text-[#e66b3c]">Services</a>
          <a href="#about" className="text-sm text-[#52616a] transition hover:text-[#e66b3c]">About Us</a>
          <a href="#contact" className="text-sm text-[#52616a] transition hover:text-[#e66b3c]">Contact</a>
        </nav>

        <a
          href="#booking-form"
          className="inline-flex items-center justify-center rounded-lg bg-[#e66b3c] px-5 py-3.5 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#cb5428] max-sm:px-3 max-sm:py-3"
        >
          Book a Service
        </a>
      </header>

      <main>
        {/* Hero */}
        <section
          id="home"
          className="grid scroll-mt-24 grid-cols-[1.05fr_0.95fr] items-center gap-16 bg-[#f5f8f7] px-[7%] py-24 max-lg:grid-cols-1 max-md:px-[5%] max-md:py-16"
        >
          <div className="max-w-[600px]">
            <p className="mb-5 text-[11px] font-extrabold tracking-[2px] text-[#e66b3c]">
              YOUR TRUSTED LOCAL GARAGE
            </p>

            <h1 className="font-['Manrope'] text-[clamp(40px,5vw,65px)] font-extrabold leading-[1.15] tracking-[-2px] text-[#172b35]">
              Reliable Car Care.
              <br />
              <span className="text-[#e66b3c]">Every Journey.</span>
            </h1>

            <p className="my-6 max-w-[490px] text-base leading-[1.9] text-[#62717a]">
              From seasonal tire changes to vehicle maintenance, we help keep
              your car safe and ready for the road.
            </p>

            <div className="flex flex-wrap items-center gap-3.5 max-sm:flex-col max-sm:items-stretch">
              <a
                href="#booking-form"
                className="inline-flex items-center justify-center rounded-lg bg-[#e66b3c] px-5 py-4 text-sm font-bold text-white transition hover:bg-[#cb5428]"
              >
                Book Your Service →
              </a>
              <a
                href="#services"
                className="inline-flex items-center justify-center rounded-lg border border-[#d9e0df] px-5 py-4 text-sm font-bold transition hover:bg-white"
              >
                Explore Services
              </a>
            </div>

            <p className="mt-7 text-[13px] text-[#62717a]">
              <span className="mr-2 font-extrabold text-[#27855b]">✓</span>
              Professional care for your vehicle
            </p>
          </div>

          {/* Garage Image */}
          <div className="flex min-h-[370px] flex-col justify-between overflow-hidden rounded-[20px] bg-gradient-to-br from-[#183945] to-[#0d252e] p-6 text-white shadow-2xl max-md:min-h-[320px]">
            <div className="flex items-center justify-between text-[10px] font-bold tracking-[2px] text-[#c5d5d7]">
              <span>ARCTIC AUTO CLINIC</span>
              <span className="text-[#69d8a1]">●</span>
            </div>

            <div className="my-5 h-[245px] overflow-hidden rounded-xl max-sm:h-[190px]">
              <img
                src="/images/garage-car.png"
                alt="Car being serviced at Arctic Auto Clinic"
                className="h-full w-full object-cover object-center"
              />
            </div>

            <div className="flex items-center justify-between gap-3 border-t border-white/15 pt-5">
              <div>
                <h2 className="text-base font-bold text-white">
                  Drive with confidence.
                </h2>
                <p className="mt-2 text-[13px] text-[#b9cbd0]">
                  We take care of your car.
                </p>
              </div>
              <a
                href="#services"
                aria-label="Explore our services"
                className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/30 transition hover:bg-white/10"
              >
                ↗
              </a>
            </div>
          </div>
        </section>

        {/* Services */}
        <section id="services" className="scroll-mt-24 bg-white px-[7%] py-24 max-md:px-[5%] max-md:py-16">
          <div className="mb-11 text-center">
            <p className="mb-5 text-[11px] font-extrabold tracking-[2px] text-[#e66b3c]">
              WHAT WE DO
            </p>
            <h2 className="font-['Manrope'] text-[clamp(29px,4vw,43px)] font-extrabold leading-tight tracking-[-2px] text-[#172b35]">
              Complete care for your car.
            </h2>
            <p className="mt-4 leading-7 text-[#697780]">
              Practical automotive services to keep you moving.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-6 max-lg:grid-cols-2 max-md:grid-cols-1">
            <article className="rounded-[13px] border border-[#e7eceb] p-[30px] transition duration-200 hover:-translate-y-1 hover:shadow-xl">
              <span className="grid h-[52px] w-[52px] place-items-center rounded-xl bg-[#fff0e9] text-2xl">❄️</span>
              <h3 className="mb-3 mt-6 font-['Manrope'] text-[19px] font-bold">Tire Change</h3>
              <p className="min-h-[70px] text-sm leading-[1.8] text-[#697780]">
                Seasonal tire changes to prepare your car for Finnish roads.
              </p>
              <a href="#booking-form" className="mt-4 inline-block text-[13px] font-bold text-[#d95e32] hover:underline">Book service ↗</a>
            </article>

            <article className="rounded-[13px] border border-[#e7eceb] p-[30px] transition duration-200 hover:-translate-y-1 hover:shadow-xl">
              <span className="grid h-[52px] w-[52px] place-items-center rounded-xl bg-[#fff0e9] text-2xl">🔧</span>
              <h3 className="mb-3 mt-6 font-['Manrope'] text-[19px] font-bold">Car Maintenance</h3>
              <p className="min-h-[70px] text-sm leading-[1.8] text-[#697780]">
                Routine maintenance to help keep your vehicle in good condition.
              </p>
              <a href="#booking-form" className="mt-4 inline-block text-[13px] font-bold text-[#d95e32] hover:underline">Book service ↗</a>
            </article>

            <article className="rounded-[13px] border border-[#e7eceb] p-[30px] transition duration-200 hover:-translate-y-1 hover:shadow-xl">
              <span className="grid h-[52px] w-[52px] place-items-center rounded-xl bg-[#fff0e9] text-2xl">⚙️</span>
              <h3 className="mb-3 mt-6 font-['Manrope'] text-[19px] font-bold">Mechanical Repairs</h3>
              <p className="min-h-[70px] text-sm leading-[1.8] text-[#697780]">
                Get help with vehicle problems and necessary repairs.
              </p>
              <a href="#booking-form" className="mt-4 inline-block text-[13px] font-bold text-[#d95e32] hover:underline">Book service ↗</a>
            </article>
          </div>
        </section>

        {/* About */}
        <section id="about" className="scroll-mt-24 px-[7%] py-12 max-md:px-[5%]">
          <div className="rounded-2xl bg-[#f5f8f7] p-10 max-md:p-6">
            <p className="mb-4 text-[11px] font-extrabold tracking-[2px] text-[#e66b3c]">ABOUT OUR GARAGE</p>
            <h2 className="font-['Manrope'] text-3xl font-extrabold tracking-tight">Your car deserves the right care.</h2>
            <p className="mt-4 max-w-2xl leading-7 text-[#697780]">
              Arctic Auto Clinic provides automotive service and repair support.
              We aim to make service requests simple and convenient for our customers.
            </p>
          </div>
        </section>

        {/* Booking CTA */}
        <section className="mx-[7%] my-12 flex items-center justify-between gap-8 rounded-2xl bg-[#f5f8f7] p-10 max-md:mx-[5%] max-md:flex-col max-md:items-start max-md:p-6">
          <div>
            <p className="mb-4 text-[11px] font-extrabold tracking-[2px] text-[#e66b3c]">READY TO GET STARTED?</p>
            <h2 className="font-['Manrope'] text-3xl font-extrabold tracking-tight">Your car deserves the right care.</h2>
            <p className="mt-4 leading-7 text-[#697780]">
              Contact our team to discuss your vehicle's service needs.
            </p>
          </div>
          <a href="#contact" className="shrink-0 rounded-lg bg-[#e66b3c] px-6 py-4 text-sm font-bold text-white transition hover:bg-[#cb5428]">
            Contact Us →
          </a>
        </section>

        {/* Booking Form */}
        <section id="booking-form" className="scroll-mt-24 bg-[#f8faf9] px-[7%] py-20 max-md:px-[5%] max-md:py-14">
          {/* Heading centered */}
          <div className="mx-auto mb-8 max-w-[850px] text-center">
            <p className="mb-4 text-[11px] font-extrabold tracking-[2px] text-[#e66b3c]">
              BOOK AN APPOINTMENT
            </p>
            <h2 className="font-['Manrope'] text-[clamp(29px,4vw,43px)] font-extrabold leading-tight tracking-[-2px] text-[#172b35]">
              Schedule your car service.
            </h2>
            <p className="mt-3 leading-7 text-[#697780]">
              Tell us about your vehicle and the service you need.
            </p>
          </div>

          <form
            className="mx-auto max-w-[850px] rounded-2xl border border-[#e7eceb] bg-white p-9 shadow-sm max-sm:p-5"
            onSubmit={(event) => {
              event.preventDefault()
              alert('Booking form submitted! Backend integration is coming next.')
            }}
          >
            <div className="grid grid-cols-2 gap-x-5 gap-y-6 max-sm:grid-cols-1">
              <div className="flex flex-col gap-2">
                <label htmlFor="customerName" className="text-left text-[13px] font-bold text-[#172b35]">Full name *</label>
                <input id="customerName" name="customerName" type="text" placeholder="Enter your full name" required className="w-full rounded-lg border border-[#d9e0df] bg-white px-3.5 py-3 text-sm text-[#172b35] outline-none transition placeholder:text-[#9aa6ac] focus:border-[#e66b3c] focus:ring-4 focus:ring-[#e66b3c]/10" />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-left text-[13px] font-bold text-[#172b35]">Email address *</label>
                <input id="email" name="email" type="email" placeholder="you@example.com" required className="w-full rounded-lg border border-[#d9e0df] bg-white px-3.5 py-3 text-sm text-[#172b35] outline-none transition placeholder:text-[#9aa6ac] focus:border-[#e66b3c] focus:ring-4 focus:ring-[#e66b3c]/10" />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="phone" className="text-left text-[13px] font-bold text-[#172b35]">Phone number *</label>
                <input id="phone" name="phone" type="tel" placeholder="Your phone number" required className="w-full rounded-lg border border-[#d9e0df] bg-white px-3.5 py-3 text-sm text-[#172b35] outline-none transition placeholder:text-[#9aa6ac] focus:border-[#e66b3c] focus:ring-4 focus:ring-[#e66b3c]/10" />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="registration" className="text-left text-[13px] font-bold text-[#172b35]">Car registration number *</label>
                <input id="registration" name="registration" type="text" placeholder="e.g. ABC-123" required className="w-full rounded-lg border border-[#d9e0df] bg-white px-3.5 py-3 text-sm text-[#172b35] outline-none transition placeholder:text-[#9aa6ac] focus:border-[#e66b3c] focus:ring-4 focus:ring-[#e66b3c]/10" />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="service" className="text-left text-[13px] font-bold text-[#172b35]">Select service *</label>
                <select id="service" name="service" required defaultValue="" className="w-full rounded-lg border border-[#d9e0df] bg-white px-3.5 py-3 text-sm text-[#172b35] outline-none focus:border-[#e66b3c] focus:ring-4 focus:ring-[#e66b3c]/10">
                  <option value="" disabled>Choose a service</option>
                  <option value="tire-change">Tire change</option>
                  <option value="maintenance">Car maintenance</option>
                  <option value="mechanical-repair">Mechanical repairs</option>
                  <option value="diagnostics">Vehicle diagnostics</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="date" className="text-left text-[13px] font-bold text-[#172b35]">Preferred date *</label>
                <input id="date" name="date" type="date" required className="w-full rounded-lg border border-[#d9e0df] bg-white px-3.5 py-3 text-sm text-[#172b35] outline-none focus:border-[#e66b3c] focus:ring-4 focus:ring-[#e66b3c]/10" />
              </div>

              <div className="col-span-full flex flex-col gap-2">
                <label htmlFor="description" className="text-left text-[13px] font-bold text-[#172b35]">Describe the problem or service needed</label>
                <textarea id="description" name="description" rows={4} placeholder="Tell us more about your car or service needs..." className="w-full resize-y rounded-lg border border-[#d9e0df] bg-white px-3.5 py-3 text-sm text-[#172b35] outline-none placeholder:text-[#9aa6ac] focus:border-[#e66b3c] focus:ring-4 focus:ring-[#e66b3c]/10" />
              </div>
            </div>

            {/* Submit button centered */}
            <div className="mt-7 flex justify-center">
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-lg bg-[#e66b3c] px-5 py-4 text-sm font-bold text-white transition hover:bg-[#cb5428] max-sm:w-full"
              >
                Submit Booking Request →
              </button>
            </div>

            <p className="mt-4 text-xs leading-6 text-[#697780] text-center">
              * Required fields. Your appointment is not confirmed until the garage reviews your request.
            </p>
          </form>
        </section>

        {/* Contact */}
        <section id="contact" className="scroll-mt-24 bg-white px-[7%] py-20 text-center max-md:px-[5%]">
          <p className="mb-4 text-[11px] font-extrabold tracking-[2px] text-[#e66b3c]">GET IN TOUCH</p>
          <h2 className="font-['Manrope'] text-[clamp(29px,4vw,43px)] font-extrabold tracking-[-2px] text-[#172b35]">
            We're here to help.
          </h2>
          <p className="mt-4 leading-7 text-[#697780]">
            Contact Arctic Auto Clinic for service information and bookings.
          </p>
          <p className="mt-3 text-sm text-[#697780]">
            Contact details and opening hours will be added after confirmation with the company.
          </p>
        </section>
      </main>

      {/* Footer */}
      <footer className="flex items-center justify-between gap-5 border-t border-[#e7eceb] bg-white px-[7%] py-7 max-sm:flex-col max-sm:items-start max-md:px-[5%]">
        <a href="#home" className="font-['Manrope'] text-[25px] font-extrabold tracking-[-1.2px]">
          Arctic<span className="text-[#e66b3c]">Auto</span>
        </a>
        <p className="text-xs text-[#697780]">
          © {new Date().getFullYear()} Arctic Auto Clinic
        </p>
      </footer>
    </div>
  )
}

export default App
