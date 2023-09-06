'use client'

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { login } from "service/login.service copy";
import { useEffect, useState } from "react";
import ModalComplete from "@/components/ModalComplete";
import { useRouter } from 'next/navigation'

export default function SignIn() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [mensagemUsuario, setMensagemUsuario] = useState<string>("")
  const router = useRouter()
  
  const handleSubmit = async (event: { preventDefault: () => void; currentTarget: HTMLFormElement | undefined; }) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    
    const email = data.get("email") as string | null;
    const password = data.get("password") as string | null;   

    const response = await login({
      email: email || "",
      senha: password || "",
    }, setMensagemUsuario);

    if (response) {
      setIsModalOpen(true)
    }
  };

  useEffect(()=>{
    if (mensagemUsuario === 'Usuário logado com sucesso') {
      router.push('/gestao')
    }
  },[mensagemUsuario])

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
        <Typography component="h1" variant="h5" marginTop={10}>
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
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
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <Link href="/signup" variant="body2">
                {"Ainda não tem conta? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}