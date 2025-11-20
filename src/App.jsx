import { useState } from "react";
import {
  Users,
  DollarSign,
  FolderGit2,
  ArrowRight,
  Sparkles,
  Menu,
  X,
  Globe2,
  Plus,
  ArrowUp,
  ArrowDown,
  Trash2,
} from "lucide-react";

// Tipos de card (ícone + cor)
const CARD_TYPES = [
  {
    id: "people",
    label: "Pessoas / RH",
    icon: Users,
    color: "text-cyan-300",
    bg: "bg-cyan-500/20",
  },
  {
    id: "finance",
    label: "Financeiro",
    icon: DollarSign,
    color: "text-emerald-300",
    bg: "bg-emerald-500/20",
  },
  {
    id: "site",
    label: "Site / Portal",
    icon: Globe2,
    color: "text-indigo-300",
    bg: "bg-indigo-500/20",
  },
  {
    id: "generic",
    label: "Genérico / Outros",
    icon: FolderGit2,
    color: "text-sky-300",
    bg: "bg-sky-500/20",
  },
];

const getTypeDef = (typeId) =>
  CARD_TYPES.find((t) => t.id === typeId) ||
  CARD_TYPES.find((t) => t.id === "generic");

const initialCards = [
  {
    id: "colaboradores",
    type: "people",
    name: "Colaboradores CRM",
    description:
      "Gerencie colaboradores, funções, equipes e estrutura organizacional em um único lugar.",
    footer: "painel de colaboradores",
    link: "https://cleverconnection.github.io/ColaboradoresCRM/",
  },
  {
    id: "financas",
    type: "finance",
    name: "Finanças CRM",
    description:
      "Acompanhe lançamentos, fluxo de caixa e visão financeira da operação Clever.",
    footer: "painel financeiro",
    link: "https://cleverconnection.github.io/FinanceCRM/",
  },
  {
    id: "site",
    type: "site",
    name: "Site Clever",
    description:
      "Acesse o site institucional cleverconnection.com.br para visão geral da empresa.",
    footer: "portal institucional",
    link: "https://cleverconnection.com.br/",
  },
  {
    id: "outros",
    type: "generic",
    name: "Outros CRM",
    description:
      "Espaço reservado para novos CRMs e integrações em desenvolvimento.",
    footer: "status: em desenvolvimento",
    link: "#", // em desenvolvimento
  },
];

export default function App() {
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [cards, setCards] = useState(initialCards);
  const [editingIndex, setEditingIndex] = useState(null); // number | "new" | null
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    link: "",
    isDev: false,
    type: "generic",
    footer: "",
  });

  const handleNavigation = (link) => {
    if (link && link !== "#" && !editMode) {
      window.open(link, "_blank");
    }
  };

  const activeCount = cards.filter(
    (item) => item.link && item.link !== "#"
  ).length;
  const devCount = cards.length - activeCount;

  const handleFormChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const startEditCard = (index) => {
    const card = cards[index];
    setEditingIndex(index);
    setFormData({
      name: card.name || "",
      description: card.description || "",
      link: card.link && card.link !== "#" ? card.link : "",
      isDev: !card.link || card.link === "#",
      type: card.type || "generic",
      footer: card.footer || "",
    });
  };

  const startNewCard = () => {
    setEditingIndex("new");
    setFormData({
      name: "",
      description: "",
      link: "",
      isDev: false,
      type: "generic",
      footer: "",
    });
  };

  const resetForm = () => {
    setEditingIndex(null);
    setFormData({
      name: "",
      description: "",
      link: "",
      isDev: false,
      type: "generic",
      footer: "",
    });
  };

  const moveCard = (index, direction) => {
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= cards.length) return;
    const updated = [...cards];
    const [moved] = updated.splice(index, 1);
    updated.splice(newIndex, 0, moved);
    setCards(updated);
    setEditingIndex(newIndex);
  };

  const removeCard = (index) => {
    const updated = cards.filter((_, i) => i !== index);
    setCards(updated);
    resetForm();
  };

  const handleSaveCard = () => {
    const name = formData.name.trim();
    const description = formData.description.trim();
    const rawLink = formData.link.trim();
    const isDev = formData.isDev || !rawLink;
    const link = isDev ? "#" : rawLink || "#";
    const type = formData.type || "generic";
    const footer =
      formData.footer.trim() ||
      (isDev ? "status: em desenvolvimento" : "rota configurada");

    if (!name) {
      return;
    }

    if (editingIndex === "new") {
      const newCard = {
        id: `card-${Date.now()}`,
        type,
        name,
        description,
        footer,
        link,
      };
      setCards((prev) => [...prev, newCard]);
    } else if (typeof editingIndex === "number") {
      setCards((prev) =>
        prev.map((card, idx) =>
          idx === editingIndex
            ? { ...card, type, name, description, footer, link }
            : card
        )
      );
    }

    resetForm();
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 relative overflow-hidden">
      <style>{`
        .hud-grid {
          background:
            radial-gradient(circle at 0% 0%, rgba(56,189,248,0.3) 0, transparent 55%),
            radial-gradient(circle at 100% 0%, rgba(129,140,248,0.3) 0, transparent 60%),
            radial-gradient(circle at 0% 100%, rgba(16,185,129,0.35) 0, transparent 60%),
            linear-gradient(to right, rgba(30,64,175,0.18) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(15,23,42,0.7) 1px, transparent 1px);
          background-size: auto, auto, auto, 40px 40px, 40px 40px;
        }

        .scanline {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            transparent 0%,
            rgba(15,23,42,0.95) 50%,
            transparent 100%
          );
          mix-blend-mode: soft-light;
          opacity: 0.5;
          pointer-events: none;
          animation: scan-move 8s linear infinite;
        }

        @keyframes scan-move {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }

        .page-slide {
          animation: page-slide-in 0.5s ease-out;
        }

        @keyframes page-slide-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .card-glow:hover {
          box-shadow: 0 0 35px rgba(56,189,248,0.5);
        }

        @keyframes card-pop-in {
          from { opacity: 0; transform: translateY(12px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>

      <div className="absolute inset-0 hud-grid opacity-90 -z-10" />
      <div className="scanline -z-10" />

      {/* Topbar */}
      <header className="sticky top-0 z-30 border-b border-slate-800 bg-slate-950/95 backdrop-blur page-slide">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-slate-900 flex items-center justify-center border border-cyan-400/40">
              <Sparkles size={18} className="text-cyan-300" />
            </div>
            <div>
              <p className="text-[11px] font-semibold text-cyan-300 uppercase tracking-[0.3em]">
                Clever Connection
              </p>
              <p className="text-sm text-slate-50">Your vision our expertise</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-3 text-[11px]">
            <span className="inline-flex items-center gap-1 text-slate-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>status: online</span>
            </span>

            <button
              onClick={() =>
                setEditMode((prev) => {
                  const next = !prev;
                  if (!next) resetForm();
                  return next;
                })
              }
              className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/70 px-3 py-1 hover:border-cyan-400/70"
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  editMode ? "bg-cyan-400" : "bg-slate-600"
                }`}
              />
              <span className="uppercase tracking-wide">
                {editMode ? "Modo edição: ON" : "Modo edição"}
              </span>
            </button>
          </nav>

          <button
            onClick={() => setOpen((v) => !v)}
            className="md:hidden p-2 rounded-lg border border-slate-700 page-slide"
          >
            {open ? (
              <X size={18} className="text-slate-200" />
            ) : (
              <Menu size={18} className="text-slate-200" />
            )}
          </button>
        </div>

        {open && (
          <div className="md:hidden border-t border-slate-800 bg-slate-950/95 backdrop-blur page-slide">
            <nav className="max-w-6xl mx-auto px-4 py-3 space-y-2">
              {cards.map((item) => {
                const typeDef = getTypeDef(item.type);
                const Icon = typeDef.icon;
                const disabled = !item.link || item.link === "#";
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      if (disabled || editMode) return;
                      handleNavigation(item.link);
                      setOpen(false);
                    }}
                    disabled={disabled || editMode}
                    className={`w-full flex items-center gap-3 rounded-xl px-3 py-3 text-sm border transition ${
                      disabled || editMode
                        ? "bg-slate-900 border-slate-800 text-slate-500 cursor-not-allowed"
                        : "bg-slate-900 border-slate-700 text-slate-100 hover:bg-slate-800"
                    }`}
                  >
                    <div className="p-2 rounded-lg bg-slate-800 flex items-center justify-center">
                      <Icon size={18} className={typeDef.color} />
                    </div>
                    <span className="flex-1 text-left font-medium">
                      {item.name}
                    </span>
                    {!disabled && !editMode && (
                      <ArrowRight size={16} className="text-slate-400" />
                    )}
                  </button>
                );
              })}

              {/* Toggle modo edição no mobile */}
              <button
                onClick={() =>
                  setEditMode((prev) => {
                    const next = !prev;
                    if (!next) resetForm();
                    return next;
                  })
                }
                className="mt-2 w-full inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-900/80 px-3 py-2 text-[11px]"
              >
                <span
                  className={`w-2 h-2 rounded-full ${
                    editMode ? "bg-cyan-400" : "bg-slate-600"
                  }`}
                />
                <span>{editMode ? "Modo edição: ON" : "Ativar modo edição"}</span>
              </button>
            </nav>
          </div>
        )}
      </header>

      {/* Conteúdo */}
      <main className="max-w-6xl mx-auto px-4 py-8 lg:py-12 space-y-8 page-slide">
        {/* linha info HUD */}
        <section className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-[11px] text-slate-300">
          <div>
            <p className="uppercase tracking-[0.3em] text-slate-400">
              visor principal
            </p>
            <p className="mt-1 text-sm text-slate-100">Hub de CRMs</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <span className="px-3 py-1 rounded-full border border-slate-700 bg-slate-900/70">
              módulos ativos:{" "}
              <span className="text-emerald-300 font-semibold">
                {activeCount}
              </span>
            </span>
            <span className="px-3 py-1 rounded-full border border-slate-700 bg-slate-900/70">
              em desenvolvimento:{" "}
              <span className="text-fuchsia-300 font-semibold">
                {devCount}
              </span>
            </span>
          </div>
        </section>

        {/* cards HUD */}
        <section className="grid gap-6 md:grid-cols-3">
          {cards.map((item, idx) => {
            const typeDef = getTypeDef(item.type);
            const Icon = typeDef.icon;
            const disabled = !item.link || item.link === "#";

            const footerText =
              item.footer ||
              (disabled
                ? "status: em desenvolvimento"
                : "rota configurada");

            return (
              <div
                key={item.id}
                onClick={() => {
                  if (editMode) {
                    startEditCard(idx);
                  } else if (!disabled) {
                    handleNavigation(item.link);
                  }
                }}
                className={`group relative rounded-2xl border bg-slate-950/90 p-5 flex flex-col justify-between transition-all card-glow ${
                  disabled
                    ? "border-slate-800 opacity-40 cursor-pointer"
                    : "border-slate-700 hover:border-cyan-400/80 hover:-translate-y-1 cursor-pointer"
                }`}
                style={{
                  animation: `card-pop-in 0.4s ease-out ${0.08 * idx}s both`,
                }}
              >
                {/* Controles de edição (mover/remover) */}
                {editMode && (
                  <div className="absolute top-3 right-3 flex gap-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        moveCard(idx, -1);
                      }}
                      className="p-1 rounded-md bg-slate-900/80 border border-slate-700 hover:border-cyan-400/80"
                    >
                      <ArrowUp size={12} className="text-slate-300" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        moveCard(idx, 1);
                      }}
                      className="p-1 rounded-md bg-slate-900/80 border border-slate-700 hover:border-cyan-400/80"
                    >
                      <ArrowDown size={12} className="text-slate-300" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeCard(idx);
                      }}
                      className="p-1 rounded-md bg-slate-900/80 border border-slate-700 hover:border-rose-500/80"
                    >
                      <Trash2 size={12} className="text-rose-400" />
                    </button>
                  </div>
                )}

                <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-br from-cyan-500/10 via-transparent to-emerald-500/10 rounded-2xl" />

                <div className="relative flex items-start gap-3 mb-4">
                  <div className={`p-3 rounded-xl ${typeDef.bg}`}>
                    <Icon size={22} className={typeDef.color} />
                  </div>
                  <div>
                    <p className="text-[11px] text-slate-400 uppercase tracking-[0.25em]">
                      target-{String(idx + 1).padStart(2, "0")}
                    </p>
                    <h2 className="text-sm font-semibold text-slate-50">
                      {item.name}
                    </h2>
                    <p className="mt-2 text-[11px] text-slate-300">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="relative flex items-center justify-between text-[11px] text-slate-400">
                  <span>{footerText}</span>
                  {!disabled && !editMode && (
                    <div className="inline-flex items-center gap-1 text-cyan-200 group-hover:text-white">
                      <span className="font-semibold uppercase tracking-wide">
                        ABRIR
                      </span>
                      <ArrowRight size={14} />
                    </div>
                  )}
                  {editMode && (
                    <span className="text-[10px] text-slate-500">
                      clique para editar
                    </span>
                  )}
                </div>
              </div>
            );
          })}

          {/* Card de adicionar novo (só em modo edição) */}
          {editMode && (
            <button
              type="button"
              onClick={startNewCard}
              className="relative rounded-2xl border border-dashed border-slate-700 bg-slate-950/70 p-5 flex flex-col items-center justify-center text-[11px] text-slate-300 hover:border-cyan-400/80 hover:bg-slate-900/80 transition"
            >
              <div className="w-10 h-10 rounded-full border border-slate-600 flex items-center justify-center mb-3">
                <Plus size={20} className="text-cyan-300" />
              </div>
              <p className="font-semibold uppercase tracking-[0.25em] mb-1">
                adicionar card
              </p>
              <p className="text-[11px] text-slate-400 text-center">
                Clique para criar um novo módulo com nome, descrição, tipo e link.
              </p>
            </button>
          )}
        </section>

        {/* Formulário de edição/criação */}
        {editMode && (
          <section className="space-y-3 rounded-2xl border border-slate-800 bg-slate-950/95 p-4 text-[11px]">
            <div className="flex items-center justify-between gap-2 mb-2">
              <div>
                <p className="text-slate-300 font-semibold uppercase tracking-[0.25em]">
                  {editingIndex === "new"
                    ? "Novo card"
                    : typeof editingIndex === "number"
                    ? "Editar card"
                    : "Modo edição"}
                </p>
                <p className="text-slate-400 mt-1">
                  Selecione um card ou clique em &quot;adicionar card&quot; para
                  configurar.
                </p>
              </div>
              {editingIndex !== null && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="text-slate-400 hover:text-slate-200 underline underline-offset-2"
                >
                  limpar seleção
                </button>
              )}
            </div>

            {/* Seletor de tipo (ícone + cor) */}
            <div className="mb-3">
              <p className="text-slate-400 mb-1">Tipo do card (ícone e cor)</p>
              <div className="flex flex-wrap gap-2">
                {CARD_TYPES.map((type) => {
                  const TypeIcon = type.icon;
                  const selected = formData.type === type.id;
                  return (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() =>
                        handleFormChange("type", type.id)
                      }
                      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 ${
                        selected
                          ? "border-cyan-400 bg-slate-900/80 text-slate-50"
                          : "border-slate-700 bg-slate-950/60 text-slate-400 hover:border-slate-500"
                      }`}
                    >
                      <span
                        className={`p-1.5 rounded-full ${type.bg} flex items-center justify-center`}
                      >
                        <TypeIcon size={14} className={type.color} />
                      </span>
                      <span>{type.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid gap-3 md:grid-cols-3">
              <div className="md:col-span-1">
                <label className="block text-slate-400 mb-1">Nome do card</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    handleFormChange("name", e.target.value)
                  }
                  className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-slate-100 text-[11px] focus:outline-none focus:border-cyan-400"
                  placeholder="Ex: CRM Lojas"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-slate-400 mb-1">
                  Subdescrição
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    handleFormChange("description", e.target.value)
                  }
                  className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-slate-100 text-[11px] focus:outline-none focus:border-cyan-400 min-h-[60px]"
                  placeholder="Texto curto explicando o objetivo deste módulo."
                />
              </div>
            </div>

            <div className="grid gap-3 md:grid-cols-3">
              <div className="md:col-span-2">
                <label className="block text-slate-400 mb-1">
                  URL de redirecionamento
                </label>
                <input
                  type="text"
                  value={formData.link}
                  onChange={(e) =>
                    handleFormChange("link", e.target.value)
                  }
                  className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-slate-100 text-[11px] focus:outline-none focus:border-cyan-400"
                  placeholder="https://..."
                  disabled={formData.isDev}
                />
                <label className="mt-2 inline-flex items-center gap-2 text-slate-300">
                  <input
                    type="checkbox"
                    checked={formData.isDev}
                    onChange={(e) =>
                      handleFormChange("isDev", e.target.checked)
                    }
                    className="rounded border-slate-600 bg-slate-900"
                  />
                  <span>Em desenvolvimento (sem link)</span>
                </label>
              </div>

              <div className="md:col-span-1">
                <label className="block text-slate-400 mb-1">
                  Texto do rodapé
                </label>
                <input
                  type="text"
                  value={formData.footer}
                  onChange={(e) =>
                    handleFormChange("footer", e.target.value)
                  }
                  className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-slate-100 text-[11px] focus:outline-none focus:border-cyan-400"
                  placeholder="Ex: painel de lojas"
                />
                <button
                  type="button"
                  onClick={handleSaveCard}
                  disabled={!formData.name.trim()}
                  className={`mt-3 w-full rounded-lg px-3 py-2 text-[11px] font-semibold ${
                    formData.name.trim()
                      ? "bg-cyan-500 text-slate-950 hover:bg-cyan-400"
                      : "bg-slate-800 text-slate-500 cursor-not-allowed"
                  }`}
                >
                  {editingIndex === "new"
                    ? "Criar card"
                    : "Salvar alterações"}
                </button>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
