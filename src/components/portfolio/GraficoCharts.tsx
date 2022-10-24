import { collection, DocumentData, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import { db } from "../../firebase/firebase";
import _ from 'lodash'

interface DadosGeraisProps {
    name: string;
    SaldoPortfolio: number;
}

export default function GraficoCharts() {

    const [chartData, setChartData] = useState<DocumentData>()
    const [dadosGerais, setDadosGerais] = useState<DadosGeraisProps[]>([])
    const [saldoGeral, setSaldoGeral] = useState<number>(0)

    const loadData = (data: DocumentData) => {
        const values = _.groupBy(data, (value) => value.name)

        const result = _.map(values, (value, key) =>
            [
                key, _.sumBy(values[key], (v: DocumentData) => v.SaldoPortfolio)
            ]
        )
        return [["Moedas", "Valores"], ...result]
    }

    useEffect(() => {
        onSnapshot(query(collection(db, 'CoinList'), orderBy('marketCapRank')), (snapshot) => {
            const dataCoins = (snapshot.docs.map((doc) => {
                const { name, SaldoPortfolio } = doc.data();

                return ({ name, SaldoPortfolio })
            }))
            setChartData(loadData(dataCoins))
            setDadosGerais(dataCoins)
        })
    }, [])

    useEffect(() => {
        const somaSaldo = dadosGerais.reduce((acumulador, valorAtual) => {
            return acumulador + (valorAtual.SaldoPortfolio)
        }, 0)
        setSaldoGeral(somaSaldo)
    }, [dadosGerais])

    const options = {
        title: `Balance: ${saldoGeral?.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} US$`,
        pieHole: 0.4,
        slices: [
            {
                color: '#03039d',
            },
            {
                color: '#ff0000',
            },
            {
                color: '#aa00ff',
            },
            {
                color: '#ffa200',
            },
            {
                color: '#00FF7F',
            },
            {
                color: '#E8E8E8',
            },
        ],
        is3D: false,
        backgroundColor: '#00000A',
        legendTextStyle: { color: '#DBE7F3' },
        legend: { 'alignment': 'center' },
        titleTextStyle: { color: '#DBE7F3' },
        titleFontSize: 20,
        legendFontSize: 15,
        chartArea: { width: '60%', height: '60%' },
    };

    return (
        <Chart
            width={"100%"}
            height={"40vh"}
            chartType="PieChart"
            data={chartData}
            options={options}
        />
    )
}