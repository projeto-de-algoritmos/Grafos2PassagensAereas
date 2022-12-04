import { useState } from 'react'
import './App.css'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

const PAISESEUROPA = { 'FRA': 'França', 'ESP': 'Espanha', 'ITA': 'Itália', 'POR': 'Portugal', 'POL': 'Polônia' }
const PAISESEUROPACopy = { 'FRA': 'França', 'ESP': 'Espanha', 'ITA': 'Itália', 'POR': 'Portugal', 'POL': 'Polônia' }

function App() {
	const [paisesDestino, setPaisesDestino] = useState([])
	const [paisesDestinoPossiveis, setPaisesDestinoPossiveis] = useState(PAISESEUROPA)
	const [paisesOrigem, setPaisesOrigem] = useState('')
	const [paisesD, setPaisesD] = useState('')
	const [pais, setPais] = useState('')

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
			</Grid>
		</Box>
	)
}

export default App