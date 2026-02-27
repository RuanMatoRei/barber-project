<template>
    <v-container class="fill-height d-flex align-center justify-center">
        <v-card width="400" class="pa-6">
        <v-card-title>Bem-vindo ao Sistema de Gestão de Ativos</v-card-title>
        <v-card-text>
            Por favor, faça login para acessar o sistema.
        </v-card-text>
        <v-card-actions>
            <v-btn color="primary" @click="$router.push('/login')">Login</v-btn>
        </v-card-actions>
        </v-card>
    </v-container>
</template>
