import { Footer } from '@/components/footer';
import { ProfileResult } from '@/components/profile-result';
import { ResultOptions } from '@/components/result-options';
import { getProfile } from '@/providers/bluesky';
import { Metadata } from 'next';

type Props = {
  params: {
    handle: string;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { handle } = params;

  return {
    title: `${handle} | Themis`,
  };
}

export default async function ProfileAnalysis({ params }: Props) {
  const data = await getProfile(params.handle);

  if (typeof data === 'string') {
    const message =
      data === 'Profile not found' ? (
        <p>
          O perfil @{params.handle} não foi encontrado. Talvez você tenha
          digitado errado, volte e tente novamente.
        </p>
      ) : (
        <p>{data}</p>
      );

    return (
      <div className="p-4">
        <main className="p-4 rounded-md flex flex-col gap-5 mt-20 mx-auto bg-zinc-200 border border-black/90 max-w-xl w-full">
          <div className="space-y-1">
            <h1 className="text-xl font-medium">Ocorreu um erro!</h1>
            {message}
          </div>

          <a
            href="/"
            className="bg-zinc-300 w-fit px-4 py-2 rounded hover:bg-blue-600 hover:text-white transition-colors"
          >
            Voltar
          </a>
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen items-center justify-between px-2">
      <div className="space-y-4 my-10">
        <div className="text-[#434343] text-center">
          <h1 className="text-3xl font-semibold">Themis</h1>
          <p className="text-xl font-medium">
            Resultado da avaliação do seu perfil.
          </p>
        </div>
        <ResultOptions />
        <ProfileResult profile={data} />
      </div>
      <Footer />
    </div>
  );
}

export const runtime = 'edge';
