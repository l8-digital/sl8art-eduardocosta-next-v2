

import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Política de Privacidade',
  description: 'Confira como armazenamos e protegemos os seus dados pessoais.'
};


export default function Privacity() {
  return (
    <main className="main">

      <section className="c-privacy bg-black mt-0 md:mt-16">
        <div className="container pt-12 md:pt-16 pb-12 md:pb-16 border-b border-white/20">
          <h2 className="text-primary font-secondary text-4xl md:text-5xl font-black pb-8 md:pb-12">
            Política de Privacidade
          </h2>

          <h3 className="text-xl md:text-2xl  font-extrabold text-white mb-3">
            Privacidade
          </h3>
          <p className="text-white/80 text-lg mb-4">
            A privacidade dos visitantes do site é muito importante para nós.
          </p>
          <p className="text-white/80 text-lg mb-4">
            Reconhecemos a relevância da privacidade. Seus dados pessoais não serão comercializados,
            distribuídos ou compartilhados com terceiros, exceto em casos de cumprimento de ordens judiciais.
          </p>
          <p className="text-white/80 text-lg mb-4">
            Todas as informações pessoais relativas a membros, assinantes, clientes ou visitantes que usem este site
            serão tratadas em concordância com a Lei da Proteção de Dados Pessoais de 26 de outubro de 1998&nbsp;(Lei
            n.º 67/98).
          </p>
          <p className="text-white/80 text-lg mb-4">
            Os dados relacionados a pagamentos utilizados nas compras nunca são armazenados em nossos servidores e
            as senhas são armazenadas em bancos de dados de maneira criptografada.
          </p>
          <p className="text-white/80 text-lg mb-4">
            Informações submetidas em nossas páginas de contato são utilizadas pela equipe de suporte ao cliente
            apenas para a finalidade de ajuda e não serão compartilhadas.
          </p>
          <p className="text-white/80 text-lg mb-8">
            O endereço de e-mail está seguro e nunca será divulgado. Nós detectamos o spam e protegemos sua
            privacidade integralmente.
          </p>

          <h3 className="text-xl md:text-2xl  font-extrabold text-white mb-3">
            Registros
          </h3>
          <p className="text-white/80 text-lg mb-4">
            Assim como outros websites, coletamos e usamos informações relativas aos registros. A informação contida
            nos registros inclui o seu endereço IP&nbsp;(Internet Protocol), o seu ISP&nbsp;(Internet Service
            Provider), o navegador que utilizou ao visitar-nos, o tempo da sua visita e que páginas visitou neste
            site.
          </p>
          <p className="text-white/80 text-lg mb-8">
            Rastreamos a localização/endereços de protocolo de internet&nbsp;(IP)&nbsp;para fornecer serviços livres
            de spam e segurança para todos os nossos clientes.
          </p>

          <h3 className="text-xl md:text-2xl font-extrabold  text-white mb-3">
            Os Cookies e Web Beacons
          </h3>
          <p className="text-white/80 text-lg mb-4">
            Utilizamos cookies para armazenar informação, tais como as suas preferências pessoais quando visita
            nosso site, isso poderá incluir um simples popup. Você detém o poder de desligar seus cookies nas opções
            do browser, ou efetuando alterações nas ferramentas de programas antivírus, como o Norton Internet
            Security. No entanto, isso poderá modificar a forma de interagir neste ou em outros sites, como a forma
            de fazer login que pode ser prejudicada.
          </p>
          <p className="text-white/80 text-lg mb-4">
            Você pode optar por excluir a coleta e uso das informações para direcionamento de anúncios ou sair de
            nossa lista de e-mail clicando em “unsubscribe” ao final dos e-mails que recebe.
          </p>
          <p className="text-white/80 text-lg mb-8">
            Ao usar nossos sites, você concorda com a Política de Privacidade citada acima.
          </p>

          <h3 className="text-xl md:text-2xl  font-extrabold text-white mb-3">
            Ligações a Sites de Terceiros
          </h3>
          <p className="text-white/80 text-lg mb-4">
            Este site possui ligações para outros sites, os quais, a nosso ver, podem conter informações/ferramentas
            úteis para os nossos visitantes. A nossa política de privacidade não é aplicada a sites de terceiros,
            pelo que, caso visite outro site a partir do nosso deverá ler a política de privacidade do mesmo.
          </p>
          <p className="text-white/80 text-lg">
            Não nos responsabilizamos pela política de privacidade ou conteúdo presente nesses mesmos sites.
          </p>
        </div>
      </section>

    </main>
  )
}