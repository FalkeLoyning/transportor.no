import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ArrowRight, Box, Worm } from "lucide-react";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-accent/5 via-transparent to-transparent" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-24 md:py-36 relative">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground mb-6">
                Konfigurer din{" "}
                <span className="text-accent">transportør</span>
              </h1>
              <p className="text-lg md:text-xl text-foreground/70 mb-10 max-w-2xl">
                Interaktiv RFQ-veiviser for båndtransportører og skruetransportører.
                Velg parametere, se 3D-forhåndsvisning og send forespørsel direkte til ingeniør.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-xl">
                <Link
                  href="/belt-conveyor"
                  className="group flex flex-col items-center gap-4 rounded-2xl border border-white/10 bg-surface p-8 hover:border-accent/40 hover:bg-surface-light transition-all"
                >
                  <Box className="h-12 w-12 text-accent group-hover:scale-110 transition-transform" />
                  <div className="text-center">
                    <h2 className="text-lg font-semibold text-foreground mb-1">
                      Båndtransportør
                    </h2>
                    <p className="text-sm text-muted">
                      Stykkgods, bulk, hygiene og presis indeksering
                    </p>
                  </div>
                  <span className="flex items-center gap-1 text-sm text-accent group-hover:gap-2 transition-all">
                    Start veiviser <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
                <Link
                  href="/screw-conveyor"
                  className="group flex flex-col items-center gap-4 rounded-2xl border border-white/10 bg-surface p-8 hover:border-accent/40 hover:bg-surface-light transition-all"
                >
                  <Worm className="h-12 w-12 text-accent group-hover:scale-110 transition-transform" />
                  <div className="text-center">
                    <h2 className="text-lg font-semibold text-foreground mb-1">
                      Skruetransportør
                    </h2>
                    <p className="text-sm text-muted">
                      Transportør, mater, skrå, vertikal og shaftless
                    </p>
                  </div>
                  <span className="flex items-center gap-1 text-sm text-accent group-hover:gap-2 transition-all">
                    Start veiviser <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <div className="divider" />
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-foreground">Stegvis veiviser</h3>
              <p className="text-sm text-muted">
                Konsekvent flyt med tekniske sperrer, myke råd og oppsummering før innsending.
                Basert på ISO, CEMA og EN-standarder.
              </p>
            </div>
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-foreground">3D-forhåndsvisning</h3>
              <p className="text-sm text-muted">
                Se transportøren din i sanntid mens du konfigurerer. Parametrisk 3D-modell
                som oppdateres fortløpende.
              </p>
            </div>
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-foreground">Ferdig RFQ</h3>
              <p className="text-sm text-muted">
                Komplett forespørsel med alle tekniske data, åpne spørsmål
                og vedlegg — klar til salgsingeniør.
              </p>
            </div>
          </div>
        </section>

        {/* Standards */}
        <div className="divider" />
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
          <div className="text-center space-y-4">
            <h3 className="text-sm font-medium text-muted uppercase tracking-wider">
              Bygget på anerkjente standarder
            </h3>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-foreground/50">
              <span>ISO 12100</span>
              <span>ISO 5048</span>
              <span>EN 619</span>
              <span>EN 620</span>
              <span>ISO 13849-1</span>
              <span>CEMA 300/350</span>
              <span>ISO 14890</span>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
