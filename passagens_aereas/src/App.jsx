import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import CountUp from 'react-countup';
import './App.css';
import kruskal from './graphs/index';
import OverviewFlow from './Flow';


const PAISESEUROPA = { 'FRA': 'França', 'ESP': 'Espanha', 'ITA': 'Itália', 'POR': 'Portugal', 'POL': 'Polônia' }
const PAISESEUROPACopy = { 'FRA': 'França', 'ESP': 'Espanha', 'ITA': 'Itália', 'POR': 'Portugal', 'POL': 'Polônia' }


var gNodes = 0
var gEdges = 0
var gFrom = []
var gTo = []
var gWeight = []
var precoMenor = 0
var nodesToShow = []

function App() {
	const [paisesDestino, setPaisesDestino] = useState([])
	const [paisesDestinoPossiveis, setPaisesDestinoPossiveis] = useState(PAISESEUROPA)
	const [paisesOrigem, setPaisesOrigem] = useState('')
	const [paisesD, setPaisesD] = useState('')
	const [pais, setPais] = useState('')
	const [initialEdges, setInitialEdges] = useState([])
	const [initialNodes, setInitialNodes] = useState([])
	const [cost, setCost] = useState(0)
	const [showGraph, setShowGraph] = useState(false)

	const handleAdicioanarOrigemButton = () => {
		setPaisesOrigem(pais)
		var p = paisesDestinoPossiveis
		delete p[pais]
		setPaisesDestinoPossiveis(p)
	}

	const handleChangeOrigem = (event) => {
		setPais(event.target.value);
	}

	const handleChangeDestino = (event) => {
		setPaisesD(event.target.value);
	}

	const handleAdicioanarDestinoButton = () => {
		setPaisesDestino([...paisesDestino, paisesD])

		var p = paisesDestinoPossiveis
		delete p[paisesD]
		setPaisesDestinoPossiveis(p)
		setPaisesD('')
	}

	const fat = (num) => {
		var result = num;
		if (num === 0 || num === 1)
			return 1;
		while (num > 1) {
			num--;
			result *= num;
		}
		return result;
	}

	const getRandomFloat = (min, max, decimals) => {
		const str = (Math.random() * (max - min) + min).toFixed(decimals);

		return parseFloat(str);
	}

	const achaMaisBaratoOrigemDestinos = () => {
		var precos = []
		for (var i = 0; i < paisesDestino.length; i++) {
			precos.push(getRandomFloat(500, 1000, 2))
		}
		precoMenor = Math.min(...precos)
		return precos.indexOf(Math.min(...precos))
	}

	const handleGerarPassagens = () => {
		var maisBarato = achaMaisBaratoOrigemDestinos()
		gNodes = paisesDestino.length
		gEdges = fat(gNodes) / (2 * fat(gNodes - 2))
		gFrom = []
		gTo = []
		gWeight = []

		gFrom.push(paisesOrigem)
		gTo.push(paisesDestino[maisBarato])
		gWeight.push(precoMenor)

		nodesToShow.push({ id: paisesOrigem, type: "input", data: { label: paisesOrigem }, position: { x: 0, y: 0 } })


		for (let i = 0; i < paisesDestino.length; i++) {
			for (let j = i + 1; j < paisesDestino.length; j++) {
				gFrom.push(paisesDestino[i])
				gTo.push(paisesDestino[j])
				gWeight.push(getRandomFloat(500, 1000, 2));
			}
			nodesToShow.push({ id: paisesDestino[i], data: { label: paisesDestino[i] }, position: { x: (i + 1) * 100, y: (i + 1) * 100 } })
		}



		var edgesKruskal = kruskal(gNodes + 1, gEdges + 1, gFrom, gTo, gWeight)

		setInitialEdges(edgesKruskal.edges)
		setCost(edgesKruskal.cost)
		setInitialNodes(nodesToShow)

		console.log(edgesKruskal)
		console.log(nodesToShow)
		setShowGraph(true)
	}

	return (
		<Box sx={{ flexGrow: 1 }}>
			<Grid container spacing={2}>
				<Grid item xs={12}>
					<Typography variant="h3" component="h2" gutterBottom>
						Passagens aéreas
					</Typography>
				</Grid>
				<Grid item xs={6}>
					<Stack spacing={2}>
						{/* <TextField id="pais" label="Pais de Origem" variant="outlined" onChange={(event) => { setPais(event.target.value) }} /> */}
						<FormControl fullWidth>
							<Select
								labelId="demo-simple-select-label"
								id="demo-simple-select"
								value={pais}
								label="Origem"
								onChange={handleChangeOrigem}
							>
								{Object.keys(paisesDestinoPossiveis).map((key, index) => {
									return <MenuItem value={key} key={index}>{paisesDestinoPossiveis[key]}</MenuItem>
								})}
							</Select>
						</FormControl>
						<Button variant="contained" onClick={handleAdicioanarOrigemButton}>Adicionar</Button>
						{/* <TextField id="pais" label="Pais de Destino" variant="outlined" onChange={(event) => { setPais(event.target.value) }} /> */}
						<FormControl fullWidth>
							<Select
								labelId="demo-simple-select-label"
								id="demo-simple-select"
								value={paisesD}
								label="Destino"
								onChange={handleChangeDestino}
							>
								{Object.keys(paisesDestinoPossiveis).map((key, index) => {
									return <MenuItem value={key} key={index}>{paisesDestinoPossiveis[key]}</MenuItem>
								})}
							</Select>
						</FormControl>
						<Button variant="contained" onClick={handleAdicioanarDestinoButton}>Adicionar</Button>
					</Stack>
				</Grid>
				<Grid item xs={3}>
					<Typography variant="h5" component="h2" gutterBottom>
						Paises Origem
					</Typography>
					<Stack spacing={0}>
						<Typography variant="body1" component="p" gutterBottom>
							{PAISESEUROPACopy[paisesOrigem]}
						</Typography>
					</Stack>
				</Grid>
				<Grid item xs={3}>
					<Typography variant="h5" component="h2" gutterBottom>
						Paises Destino
					</Typography>
					<Stack spacing={0}>
						{paisesDestino.map((pais, index) => (
							<Typography variant="body1" component="p" gutterBottom key={index}>
								{PAISESEUROPACopy[pais]}
							</Typography>
						))}
					</Stack>
				</Grid>
				<Grid item xs={12}>
					<Button variant="contained" onClick={handleGerarPassagens}>Gerar Passagens</Button>
				</Grid>
				<Grid item xs={8}>
					<Box sx={{ flexGrow: 1, width: 500, height: 500 }}>
						{showGraph &&
							<OverviewFlow nodes={initialNodes} edges={initialEdges} />
						}
					</Box>
				</Grid>
				<Grid item xs={4}>
					<Typography variant="h5" component="h2" gutterBottom>
						Custo Total
					</Typography>
					<CountUp end={cost} decimals={2} decimal="," prefix="$ " separator=" " />
				</Grid>
			</Grid>
		</Box>
	)
}

export default App