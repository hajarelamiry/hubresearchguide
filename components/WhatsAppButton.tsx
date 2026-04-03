"use client";

export default function WhatsAppButton() {
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <a
        href="https://wa.me/97433837805"
        target="_blank"
        rel="noopener noreferrer"
        className="relative flex items-center justify-center w-14 h-14 bg-green-500 text-white rounded-full shadow-lg transition-all duration-300"
        aria-label="Contactez-nous sur WhatsApp"
      >
        {/* Halo pulsant lent */}
        <span className="absolute inline-flex w-full h-full rounded-full bg-green-300 opacity-50 animate-ping-slow"></span>
        
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          className="w-7 h-7 fill-white relative z-10"
        >
          <path d="M16 0C7.164 0 0 7.163 0 16c0 2.822.736 5.469 2.027 7.773L0 32l8.426-2.01A15.94 15.94 0 0 0 16 32c8.836 0 16-7.163 16-16S24.836 0 16 0zm0 29.333a13.27 13.27 0 0 1-6.795-1.864l-.487-.29-5.002 1.194 1.215-4.87-.317-.502A13.267 13.267 0 0 1 2.667 16C2.667 8.636 8.636 2.667 16 2.667S29.333 8.636 29.333 16 23.364 29.333 16 29.333zm7.27-9.778c-.398-.199-2.354-1.162-2.72-1.294-.365-.133-.631-.199-.897.199-.265.398-1.029 1.294-1.261 1.56-.232.265-.465.298-.863.1-.398-.2-1.681-.62-3.202-1.976-1.183-1.056-1.982-2.36-2.214-2.758-.232-.398-.025-.613.174-.811.179-.178.398-.465.597-.697.2-.232.266-.398.398-.664.133-.265.067-.497-.033-.697-.1-.199-.897-2.163-1.229-2.96-.324-.778-.653-.672-.897-.685l-.764-.013c-.265 0-.697.1-1.062.497-.365.398-1.394 1.362-1.394 3.32s1.427 3.853 1.626 4.119c.199.265 2.808 4.287 6.802 6.013.951.41 1.693.655 2.271.839.954.304 1.823.261 2.51.158.765-.114 2.354-.962 2.687-1.891.332-.93.332-1.727.232-1.892-.099-.165-.365-.265-.763-.464z" />
        </svg>
      </a>
    </div>
  );
}