import { motion } from 'framer-motion';
import { Terminal, GitBranch, Code2, FolderGit2, ExternalLink } from 'lucide-react';

function Home() {
  // Config da animacao (suave de baixo para cima)
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  // Dados dos seus projetos
  const projetos = [
    {
      titulo: "MeuPet",
      descricao: "Sistema de gerenciamento para pets com foco em uso doméstico e comercial. Arquitetura desenhada com foco em escalabilidade e orientação a objetos.",
      techs: ["Java", "Spring Boot", "POO"],
      link: "#"
    },
    {
      titulo: "Snaze",
      descricao: "Implementação em C++ do clássico jogo da cobrinha. O projeto foca em lógica de máquina de estados e gerenciamento de recursos em memória.",
      techs: ["C++", "Lógica de Jogos"],
      link: "#"
    },
    {
      titulo: "SLOC Analyzer",
      descricao: "Ferramenta de análise de Source Lines of Code para varrer arquivos C++ e HPP, utilizando recursão de diretórios para processamento em lote.",
      techs: ["C++", "Algoritmos"],
      link: "#"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      
      {/* Efeito de luz/glow no fundo (Vibe Cyberpunk) */}
      <div className="fixed top-[-20%] left-[50%] translate-x-[-50%] w-[600px] h-[600px] bg-accent/10 blur-[120px] rounded-full pointer-events-none -z-10"></div>

      {/* Navbar Minimalista */}
      <nav className="w-full max-w-6xl mx-auto flex justify-between items-center p-6 z-10">
        <div className="font-mono font-bold text-xl tracking-wider">
          LUCAS<span className="text-accent">_</span>DEV
        </div>
        <div className="hidden md:flex gap-8 text-sm uppercase tracking-widest text-zinc-400">
          <a href="#projetos" className="hover:text-accent transition-colors">Projetos</a>
          <a href="#sobre" className="hover:text-accent transition-colors">Sobre</a>
          <a href="#skills" className="hover:text-accent transition-colors">Skills</a>
        </div>
      </nav>

      {/* Seção Principal (Hero) */}
      <main className="min-h-[85vh] flex flex-col justify-center items-center text-center px-4 z-10">
        
        <motion.div 
          initial="hidden" animate="visible" variants={fadeUp}
          className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-md font-mono text-zinc-400 mb-8 text-sm backdrop-blur-sm"
        >
          <Terminal size={16} className="text-accent" />
          <span>system.init("Noid")</span>
        </motion.div>

        <motion.h1 
          initial="hidden" animate="visible" variants={fadeUp} transition={{ delay: 0.2 }}
          className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6"
        >
          CODANDO O <span className="text-accent">FUTURO.</span>
        </motion.h1>

        <motion.p 
          initial="hidden" animate="visible" variants={fadeUp} transition={{ delay: 0.4 }}
          className="text-zinc-400 text-lg md:text-xl max-w-2xl leading-relaxed mb-10"
        >
          Estudante de Ciência da Computação na UFRN. Construindo soluções elegantes para problemas complexos, desde algoritmos em C++ até arquiteturas robustas em Java e Spring Boot.
        </motion.p>

        <motion.div 
          initial="hidden" animate="visible" variants={fadeUp} transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <a href="#projetos" className="flex items-center justify-center gap-2 bg-accent hover:bg-red-600 text-white px-8 py-4 font-bold uppercase tracking-wider transition-all hover:shadow-[0_0_20px_rgba(230,57,70,0.4)] rounded-sm">
            <Code2 size={20} />
            Ver Projetos
          </a>
          
          <button className="flex items-center justify-center gap-2 border border-white/20 hover:border-accent hover:text-accent px-8 py-4 font-bold uppercase tracking-wider transition-all text-zinc-300 rounded-sm">
            <GitBranch size={20} />
            GitHub
          </button>
        </motion.div>
      </main>

      {/* Seção de Projetos */}
      <section id="projetos" className="w-full max-w-6xl mx-auto px-6 py-24 z-10">
        
        {/* Título da Seção animado */}
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeUp}
          className="flex items-center gap-4 mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Meus <span className="text-accent">Projetos</span></h2>
          <div className="h-[1px] flex-1 bg-white/10"></div>
        </motion.div>

        {/* Grid de Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projetos.map((projeto, index) => (
            <motion.div 
              key={index}
              initial="hidden" 
              whileInView="visible" 
              viewport={{ once: true, margin: "-50px" }} 
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: index * 0.15 } }
              }}
              className="bg-zinc-900/50 border border-white/10 hover:border-accent/50 rounded-lg p-6 flex flex-col h-full transition-all hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(230,57,70,0.1)] group"
            >
              <div className="flex justify-between items-start mb-6">
                <FolderGit2 className="text-accent" size={32} />
                <a href={projeto.link} className="text-zinc-500 hover:text-white transition-colors" target="_blank" rel="noreferrer">
                  <ExternalLink size={20} />
                </a>
              </div>
              
              <h3 className="text-xl font-bold mb-3 group-hover:text-accent transition-colors">{projeto.titulo}</h3>
              <p className="text-zinc-400 text-sm flex-1 mb-6 leading-relaxed">
                {projeto.descricao}
              </p>
              
              <div className="flex flex-wrap gap-2 mt-auto">
                {projeto.techs.map((tech, i) => (
                  <span key={i} className="text-xs font-mono px-2 py-1 bg-black/50 text-accent border border-accent/20 rounded">
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

    </div>
  )
}

export default Home;