'use client';
import { motion } from 'framer-motion';

const cases = [
  {
    client: 'Karina Lara Nutrición',
    tag: 'Contenido educativo real',
    desc: 'Serie de shorts semanales con su propia imagen de marca, escritos y animados por Vox y AKBOT.',
    images: ['/ecosistema/clientes/karina-01.jpg', '/ecosistema/clientes/karina-02.jpg'],
  },
  {
    client: 'Xencalli Residencial',
    tag: 'Sistema construido a la medida',
    desc: 'Asistente de IA que atiende leads por WhatsApp, gestiona reseñas de Google y programa contenido — armado por Lima y Sierra.',
    images: ['/ecosistema/clientes/xencalli-post.jpg', '/ecosistema/clientes/xencalli-reviews.jpg'],
  },
];

export function EcosystemClients() {
  return (
    <section className="relative bg-[#080808] py-16 sm:py-20">
      <div className="divider-line absolute top-0 left-0 right-0" />
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-center mb-12">
          <motion.p
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="eyebrow text-[#0dcfcf] mb-4"
          >
            No solo para nosotros
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-heading gradient-text"
          >
            Lo mismo construimos para nuestros clientes.
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cases.map((c, i) => (
            <motion.div
              key={c.client}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-2xl border border-[#1e1e1e] bg-[#111111] p-5 flex flex-col gap-4 card-lift"
            >
              <div>
                <p className="font-mono text-[10px] uppercase tracking-widest text-[#0dcfcf]/70">{c.tag}</p>
                <h3 className="text-lg font-semibold text-white mt-0.5">{c.client}</h3>
                <p className="text-sm text-white/40 mt-1.5 leading-relaxed">{c.desc}</p>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {c.images.map((img) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={img}
                    src={img}
                    alt=""
                    className="w-full aspect-[4/5] object-cover rounded-lg border border-white/5"
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
