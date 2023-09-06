'use client'

import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { DatePicker, LocalizationProvider, ptBR } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs, { Dayjs } from "dayjs";
import { createUser } from "service/createUser.service";
import ModalComplete from "@/components/ModalComplete";

export default function SignUp() {
    const [valueDate, setValueDate] = useState<Dayjs | null>(dayjs('1990-01-01'));
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [mensagemUsuario, setMensagemUsuario] = useState<string>("")

    const handleSubmit = async (event: { preventDefault: () => void; currentTarget: HTMLFormElement | undefined; }) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        const first_name = data.get("first_name") as string | null;
        const last_name = data.get("last_name") as string | null;
        const document = data.get("document") as string | null;
        const email = data.get("email") as string | null;
        const password = data.get("password") as string | null;   
        const phone_number = data.get("phone_number") as string | null;    

        const response = await createUser({
            first_name: first_name || "",
            last_name: last_name || "",
            document: document || "",
            phone_number: phone_number || "",
            birth_date: valueDate ? valueDate.format("YYYY-MM-DD") : "1990-01-01",
            email: email || "",
            password: password || "",
        }, setMensagemUsuario);

        if (response) {
            setIsModalOpen(true)
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <ModalComplete 
                setIsModalOpen={setIsModalOpen} 
                isModalOpen={isModalOpen} 
                mensagemUsuario={mensagemUsuario} 
            />
            <Box
                sx={{  
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                }}
            >
                <Typography component="h1" variant="h5" marginTop={7}>
                Cadastro Novo Usuário
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="first_name"
                        label="Nome"
                        name="first_name"
                        autoComplete="name"
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="last_name"
                        label="Sobrenome"
                        name="last_name"
                        autoComplete="name"
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="document"
                        label="CPF"
                        name="document"
                        autoComplete="document"
                        type="number"
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Endereço de e-mail"
                        name="email"
                        autoComplete="email"
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="phone_number"
                        label="Telefone"
                        name="phone_number"
                        autoComplete="phone_number"
                        type="number"
                        autoFocus
                    />
                    <LocalizationProvider 
                        dateAdapter={AdapterDayjs}
                        localeText={ptBR.components.MuiLocalizationProvider.defaultProps.localeText}
                    >
                        <DemoContainer components={['DatePicker']}  sx={{ marginBottom: 3, width: '100%' }}>
                            <DatePicker 
                                label="Data de Nascimento"
                                value={valueDate}
                                onChange={(newValue) => setValueDate(newValue)}
                                sx={{ width: '100%' }}
                                format="DD-MM-YYYY"
                            />
                        </DemoContainer>
                    </LocalizationProvider>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign Up
                    </Button>
                    <Grid container>
                        <Grid item>
                        <Link href="/" variant="body2">
                            {"Já tem cadastro? Sign In"}
                        </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}