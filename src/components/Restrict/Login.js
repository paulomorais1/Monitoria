import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Container, CssBaseline } from '@mui/material';
import './login.css';

const Login = ({ setAuthenticated }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      console.log('Iniciando a autenticação...');

      const response = await fetch('http://localhost:8080/login.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      console.log('Resposta da requisição:', response);

      if (response.ok) {
        const data = await response.json();
        console.log('Dados recebidos:', data);

        if (data.authenticated ) {
          console.log('Autenticação bem-sucedida!');
          setAuthenticated(true);
          navigate('/restricted-area');
        } else {
          console.log('Credenciais inválidas');
          alert('Credenciais inválidas');
        }
      } else {
        console.log('Erro durante a autenticação');
        alert('Erro durante a autenticação');
      }
    } catch (error) {
      console.error('Erro durante a autenticação:', error);
      alert('Erro durante a autenticação');
    }
  };

  return (
    <Container component="main" maxWidth="xs" className="login-container">
      <CssBaseline />
      <div>
        <Typography component="h1" variant="h5">
          Login Restrito
        </Typography>
        <form>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Usuário"
            name="username"
            autoComplete="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Senha"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleLogin}
          >
            Entrar
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default Login;
