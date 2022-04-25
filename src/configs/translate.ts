export const translate = (value: string) => {
  switch (value) {
    case 'blond':
      return 'Loiro'

    case 'brown':
      return 'Castanho'

    case 'black':
      return 'Petro'

    case 'auburn, white':
      return 'Branco'

    case 'male':
      return 'Masculino'

    case 'female':
      return 'Feminino'

    case 'fair':
      return 'Clara'

    case 'light':
      return 'Branca'

    case 'brown, grey':
      return 'Grisalho'

    case 'white, red':
      return 'Branco/vermelho'

    case 'white, blue':
      return 'Branco/azul'

    case 'gold':
      return 'Dourada'

    case 'white':
      return 'Branca'

    case 'none':
      return 'n/a'

    case 'unknown':
      return 'Desconhecido'

    case 'green':
      return 'Verde'

    case 'arid':
      return 'Árido'

    case 'desert':
      return 'Deserto'

    case 'temperate':
      return 'Temperado'

    case 'grasslands, mountains':
      return 'Pastagens, montanhas'

    default:
      return value
  }
}
