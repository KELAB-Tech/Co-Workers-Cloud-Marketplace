// app/(marketplace)/components/FooterMarketplace.jsx
export default function FooterMarketplace() {
  return (
    <footer className="bg-gradient-to-r from-[#000180] to-[#001a8a] text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-xl font-bold mb-2">
            Waste<span className="text-[#45C93E]">Store</span>
          </h3>
          <p className="text-sm text-gray-300">
            Plataforma digital para la comercialización segura y eficiente de
            materiales aprovechables.
          </p>
        </div>

        <div>
          <h4 className="font-semibold mb-2">Marketplace</h4>
          <ul className="space-y-1 text-sm text-gray-300">
            <li>Materiales</li>
            <li>Maquinaria</li>
            <li>Servicios</li>
            <li>Vendedores verificados</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-2">Confianza y seguridad</h4>
          <ul className="space-y-1 text-sm text-gray-300">
            <li>Comercialización segura</li>
            <li>Perfiles verificados</li>
            <li>Soporte especializado</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 text-center py-4 text-sm text-gray-300">
        © {new Date().getFullYear()} Waste Store · Demo Marketplace
      </div>
    </footer>
  );
}
