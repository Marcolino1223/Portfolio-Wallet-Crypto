import Head from "next/head"
import Link from "next/link";
import * as S from "./styles";
import { SlWallet } from "react-icons/sl"

interface LayoutProps {
    titulo: string;
    cabecalho: string | any;
    children: React.ReactNode;
    symbol?: string;
    image?: string;
}

export default function Layout(props: LayoutProps) {
    return (
        <S.Layout>
            <Head>
                <title>{props.titulo}</title>
            </Head>
            <S.Menu>
                <Link href="/">
                    <S.DivHome>
                        <a className="cabecalho">{props.cabecalho}</a>
                    </S.DivHome>
                </Link>
                <Link href="/wallet/Wallet">
                    <S.DivHome>
                        <SlWallet className="wallet" />
                    </S.DivHome>
                </Link>
                    <S.DivSymbol>
                        <a className="symbol">{props.symbol}</a>
                    </S.DivSymbol>
                    <S.DivImagem>
                        {props.image ? (
                            <img src={props.image} alt="simbolo da moeda" className="imagem"/>
                        ) : null}
                    </S.DivImagem>
            </S.Menu>
            <S.Content>
                {props.children}
            </S.Content>
        </S.Layout>
    )
}