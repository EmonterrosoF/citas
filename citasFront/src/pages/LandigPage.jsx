import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="font-sans">
      {/* Header */}
      <header className="bg-gray-800 text-white py-4 top-0 sticky">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">The King Barber</h1>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <a href="#services" className="hover:text-yellow-500">
                  Servicios
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-yellow-500">
                  Sobre Nosotros
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-yellow-500">
                  Reservar cita
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section
        className="bg-cover bg-center h-screen"
        style={{
          backgroundImage: `url(https://images.fresha.com/lead-images/placeholders/barbershop-22.jpg?class=venue-gallery-large&dpr=2)`,
        }}
      >
        <div className="flex items-center justify-center h-full bg-black bg-opacity-50">
          <div className="text-center text-white">
            <h2 className="text-4xl font-bold mb-4">
              Estilo y precisión en cada corte
            </h2>
            <p className="text-lg mb-8">
              La mejor barbería en Chiquimulilla, Santa Rosa desde 2012.
            </p>
            <a
              href="#contact"
              className="bg-yellow-500 text-black px-4 py-2 rounded"
            >
              Reserva tu cita
            </a>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 bg-gray-100">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Nuestros Servicios
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded shadow">
              <h3 className="text-2xl font-bold mb-4">Corte de Cabello</h3>
              <p>
                Ofrecemos cortes de alta calidad adaptados a tu estilo personal.
              </p>
            </div>
            <div className="bg-white p-6 rounded shadow">
              <h3 className="text-2xl font-bold mb-4">Afeitado Clásico</h3>
              <p>
                Disfruta de un afeitado clásico con toallas calientes y
                precisión.
              </p>
            </div>
            <div className="bg-white p-6 rounded shadow">
              <h3 className="text-2xl font-bold mb-4">Cuidado de Barba</h3>
              <p>
                Manten tu barba en perfectas condiciones con nuestros expertos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 bg-gray-800 text-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Sobre Nosotros
          </h2>
          <p className="text-center max-w-2xl mx-auto">
            The King Barber Life es una barbería con más de una década de
            experiencia en ofrecer servicios estéticos de alta calidad. Nuestra
            misión es brindar un servicio excepcional en un ambiente cómodo,
            todo mediante un sistema de citas que asegura la disponibilidad.
          </p>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-16 bg-gray-100">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Testimonios de Clientes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonio 1 */}
            <blockquote className="bg-white p-6 rounded shadow-lg">
              <p className="italic text-gray-600">
                {
                  "Excelente servicio y el mejor corte de cabello que he recibido. ¡Muy recomendable!"
                }
              </p>
              <cite className="text-right block text-gray-800 mt-4">
                - Juan Pérez
              </cite>
            </blockquote>

            {/* Testimonio 2 */}
            <blockquote className="bg-white p-6 rounded shadow-lg">
              <p className="italic text-gray-600">
                {
                  "El ambiente es muy cómodo y el personal es muy profesional. Siempre salgo satisfecho."
                }
              </p>
              <cite className="text-right block text-gray-800 mt-4">
                - Carlos López
              </cite>
            </blockquote>

            {/* Testimonio 3 */}
            <blockquote className="bg-white p-6 rounded shadow-lg">
              <p className="italic text-gray-600">
                {
                  "¡Mi barba nunca ha estado mejor! Sin duda, la mejor barbería de la ciudad."
                }
              </p>
              <cite className="text-right block text-gray-800 mt-4">
                - Luis Martínez
              </cite>
            </blockquote>

            {/* Testimonio 4 */}
            <blockquote className="bg-white p-6 rounded shadow-lg">
              <p className="italic text-gray-600">
                {
                  "Muy puntuales con las citas y el corte fue justo lo que buscaba. Volveré sin duda."
                }
              </p>
              <cite className="text-right block text-gray-800 mt-4">
                - Pedro González
              </cite>
            </blockquote>

            {/* Testimonio 5 */}
            <blockquote className="bg-white p-6 rounded shadow-lg">
              <p className="italic text-gray-600">
                {
                  "El servicio fue increíble, el personal es amable y el lugar es muy limpio."
                }
              </p>
              <cite className="text-right block text-gray-800 mt-4">
                - Marío Fernández
              </cite>
            </blockquote>

            {/* Testimonio 6 */}
            <blockquote className="bg-white p-6 rounded shadow-lg">
              <p className="italic text-gray-600">
                {
                  "Siempre que necesito un corte o arreglo rápido, confío en The King Barber."
                }
              </p>
              <cite className="text-right block text-gray-800 mt-4">
                - Jorge Ramírez
              </cite>
            </blockquote>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-gray-800 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-12">Reserva tu cita</h2>
          <p>Agenda tu cita en la mejor barbería de Chiquimulilla.</p>
          <Link
            to="/reserva"
            className="bg-yellow-500 text-black px-6 py-3 rounded mt-4 inline-block"
          >
            Haz tu reserva
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto text-center">
          <p>
            &copy; 2024 The King Barber Life. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
