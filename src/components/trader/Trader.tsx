import { ChangeEvent, useEffect, useState } from "react"
import ReactModal from "react-modal"
import { addDocCompraTrader } from "../../backend/addDocCompraTrader"
import { addDocVendaTrader } from "../../backend/addDocVendaTrader"
import { useModal } from "../../hooks/useModal"
import { TraderCompraProps, TraderVendaProps } from "../../types/Interfaces"
import DadosTrader from "./DadosTrader"
import * as S from "./styles"

type TraderProps = {
    id: string,
    priceUsd: number,
    moedasTotal: number,
    Atualiza: (state: number) => void
}

export default function Trader(props: TraderProps) {

    const { modalIsOpen, closeModal, showModal, modalIsOpenVenda, showModalVenda, closeModalVenda } = useModal()

    const [date, setDate] = useState<string>('');
    const [aporte, setAporte] = useState<string>('');
    const [valorDaMoeda, setValorDaMoeda] = useState<string>('');
    const [numeroDeMoedas, setNumeroDeMoedas] = useState<string>('');

    const [dateVenda, setDateVenda] = useState<string>('');
    const [saque, setSaque] = useState<string>('');
    const [valorDaMoedaVenda, setValorDaMoedavenda] = useState<string>('');
    const [numeroDeMoedasVenda, setNumeroDeMoedasVenda] = useState<string>('');

    useEffect(() => {
        if (props.priceUsd) {
            setValorDaMoeda((props.priceUsd).toString())
            setValorDaMoedavenda((props.priceUsd.toString()))
        } else { return }
    }, [props.priceUsd])

    const dadosCompra: TraderCompraProps = {
        id: props.id,
        data: date,
        aporte: parseFloat(aporte),
        valorDaMoeda: parseFloat(valorDaMoeda),
        priceUsd: props.priceUsd,
    }

    const dadosVenda: TraderVendaProps = {
        id: props.id,
        data: dateVenda,
        valorSaque: parseFloat(saque),
        valorDeVenda: parseFloat(valorDaMoedaVenda),
        quantDeMoedas: parseFloat(numeroDeMoedasVenda),
    }

    function traderCompra() {
        addDocCompraTrader(dadosCompra)
        closeModal()
        props.Atualiza(1)
        setDate('');
        setAporte('');
        setValorDaMoeda('');
        setNumeroDeMoedas('');
    }

    function traderVenda() {
        addDocVendaTrader(dadosVenda);
        closeModalVenda();
        props.Atualiza(1)
        setDateVenda('');
        setSaque('');
        setValorDaMoedavenda('');
        setNumeroDeMoedasVenda('');
    }

    //Modal de Compra ================================================================================================

    const changeAporte = (e: ChangeEvent<HTMLInputElement>) => {
        const valor = e.target.value;
        const valorNumber = parseFloat(valor);
        const valorDaMoedaNumber = parseFloat(valorDaMoeda)

        if (valor === '') {
            setAporte('');
            setNumeroDeMoedas('');
        } else {
            const moedas = valorNumber / valorDaMoedaNumber
            setAporte(valor)
            setNumeroDeMoedas(moedas.toString())
        }
    }

    const changePrice = (e: ChangeEvent<HTMLInputElement>) => {
        const newPrice = parseFloat(e.target.value);
        const moedas = parseFloat(aporte) / newPrice
        setNumeroDeMoedas(moedas.toString());
        setValorDaMoeda(newPrice.toString());
    }

    const changeMoedas = (e: ChangeEvent<HTMLInputElement>) => {
        const moeda = e.target.value;
        const moedas = parseFloat(moeda)
        const valorDaMoedaNumber = parseFloat(valorDaMoeda)
        if (moeda === '') {
            setAporte('');
            setNumeroDeMoedas('')
        } else {
            const Aporte = moedas * valorDaMoedaNumber
            setAporte(Aporte.toString())
            setNumeroDeMoedas(moeda)
        }
    }

    // Modal de Venda ==================================================================================================

    const changeSaque = (e: ChangeEvent<HTMLInputElement>) => {
        const valor = e.target.value;
        const valorDigitado = parseFloat(e.target.value);
        const valorDaMoedaVendaNumber = parseFloat(valorDaMoedaVenda)

        if (valor === '') {
            setSaque('');
            setNumeroDeMoedasVenda('');
        } else {
            const moedas = valorDigitado / valorDaMoedaVendaNumber
            setSaque(valor)
            setNumeroDeMoedasVenda(moedas.toString())
        }
    }

    const changePricevenda = (e: ChangeEvent<HTMLInputElement>) => {
        const newPrice = parseFloat(e.target.value);
        const moedas = parseFloat(saque) / newPrice
        setNumeroDeMoedasVenda(moedas.toString())
        setValorDaMoedavenda(newPrice.toString())
    }

    const changeMoedasVenda = (e: ChangeEvent<HTMLInputElement>) => {
        const moeda = e.target.value;
        const moedas = parseFloat(e.target.value)
        const valorDaMoedaVendaNumber = parseFloat(valorDaMoedaVenda)

        if (moeda === '') {
            setSaque('')
            setNumeroDeMoedasVenda('')
        } else {
            const Saque = moedas * valorDaMoedaVendaNumber
            setSaque(Saque.toString())
            setNumeroDeMoedasVenda(moeda)
        }
    }

    const maxMoedas = (e: ChangeEvent<HTMLInputElement>) => {
        const range = (e.target.value).toString();
        const rangeNumber = parseFloat(range);
        const valorDaMoedaVendaNumber = parseFloat(valorDaMoedaVenda)

        if (range === '') {
            setNumeroDeMoedasVenda('')
            setSaque('')
        } else {
            const saque = rangeNumber * valorDaMoedaVendaNumber
            setNumeroDeMoedasVenda(range);
            setSaque(saque.toString())
        }
    }

    //==================================================================================================================

    return (
        <>
            <S.DivBody>
                <S.DivBotoes>
                    <S.BotaoCompra className="compra" onClick={showModal}>Comprar</S.BotaoCompra>
                    <S.BotaoVenda className="venda" onClick={showModalVenda}>Vender</S.BotaoVenda>
                </S.DivBotoes>
                <S.DivDadosTrader>
                    <DadosTrader id={props.id} priceUsd={props.priceUsd} Atualiza={props.Atualiza} />
                </S.DivDadosTrader>
            </S.DivBody>
            <ReactModal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                ariaHideApp={false}
                style={{
                    overlay: {
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    },
                    content: {
                        position: 'absolute',
                        justifyContent: 'center',
                        width: '16%',
                        margin: 'auto',
                        height: '400px',
                        border: '1px solid #2c1282',
                        background: '#040710',
                        overflow: 'auto',
                        WebkitOverflowScrolling: 'touch',
                        borderRadius: '10px',
                        outline: 'none',
                        padding: '25px',
                    }
                }} >
                <>
                    <S.TitulosModal>Data do Aporte</S.TitulosModal>
                    <S.InputModal type="Date"
                        autoFocus
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                    <S.TitulosModal>Valor de Compra da Moeda</S.TitulosModal>
                    <S.InputModal type="number"
                        value={valorDaMoeda}
                        onChange={changePrice}
                    />
                    <S.TitulosModal>Valor do Aporte USD$</S.TitulosModal>
                    <S.InputModal type="number"
                        value={aporte}
                        onChange={changeAporte}
                    />
                    <S.TitulosModal>Quant. de Moedas</S.TitulosModal>
                    <S.InputModal type="number"
                        value={numeroDeMoedas}
                        onChange={changeMoedas}
                    />
                    <S.DivBotaoCompraTrader>
                        <S.BotaoCompraTrader onClick={traderCompra}>Comprar</S.BotaoCompraTrader>
                    </S.DivBotaoCompraTrader>
                </>
            </ReactModal>

            <ReactModal
                isOpen={modalIsOpenVenda}
                onRequestClose={closeModalVenda}
                ariaHideApp={false}
                style={{
                    overlay: {
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    },
                    content: {
                        position: 'absolute',
                        justifyContent: 'center',
                        width: '16%',
                        margin: 'auto',
                        height: '450px',
                        border: '1px solid #2c1282',
                        backgroundColor: '#040710',
                        overflow: 'auto',
                        WebkitOverflowScrolling: 'touch',
                        borderRadius: '10px',
                        outline: 'none',
                        padding: '25px',
                    }
                }} >
                <>
                    <S.TitulosModal>Data da Venda</S.TitulosModal>
                    <S.InputModal type="Date"
                        value={dateVenda}
                        autoFocus
                        onChange={(e) => setDateVenda(e.target.value)}
                    />
                    <S.TitulosModal>Valor de Venda da Moeda</S.TitulosModal>
                    <S.InputModal type="number"
                        value={valorDaMoedaVenda}
                        onChange={changePricevenda}
                    />
                    <S.TitulosModal>Valor do Saque USD$</S.TitulosModal>
                    <S.InputModal type="number"
                        value={saque}
                        onChange={changeSaque}
                    />
                    <S.TitulosModal>Quant. de Moedas</S.TitulosModal>
                    <S.InputModal type="number"
                        value={numeroDeMoedasVenda}
                        onChange={changeMoedasVenda}
                    />
                    <S.InputModal type="range"
                        value={numeroDeMoedasVenda}
                        max={props.moedasTotal}
                        step="any"
                        onChange={maxMoedas}
                    />
                    <S.DivBotaoVendaTrader>
                        <S.BotaoVendaTrader onClick={traderVenda}>Vender</S.BotaoVendaTrader>
                    </S.DivBotaoVendaTrader>
                </>
            </ReactModal>
        </>
    )
}