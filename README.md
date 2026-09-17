# Roteiro Litúrgico

## Branch de refatoração

A branch `refactor/estrutura-manutenivel` inicia uma migração incremental do aplicativo monolítico para uma estrutura mais sustentável.

### Arquivos novos

- `app.js`: utilitários de estado, acessibilidade, modais e validação.
- `styles.css`: regras adicionais isoladas para foco, acessibilidade e preferências do usuário.
- `leituras.js`: continua sendo a fonte dos textos litúrgicos nesta primeira etapa.

### Como testar

1. Abra a branch `refactor/estrutura-manutenivel`.
2. Sirva o diretório por HTTP, pois o PWA e alguns recursos do navegador não funcionam corretamente via `file://`:

```bash
python -m http.server 8000
```

3. Acesse `http://localhost:8000`.

### Próxima etapa de integração

A migração completa deve mover o CSS inline para `styles.css`, retirar o script inline de `index.html` e substituir a marcação repetida das semanas por dados estruturados. Essa etapa deve ser feita preservando o `index.html` legado até que a nova renderização seja validada visualmente e funcionalmente.
