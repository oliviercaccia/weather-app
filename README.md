# Interface Météo — Transports en Commun

Application météo destinée aux écrans d'information des réseaux de transport en commun.

## Configuration de la ville

Éditez le fichier `config/city.json` avant déploiement :

```json
{
  "city": "Arles",
  "country": "FR",
  "latitude": 43.6768,
  "longitude": 4.6278,
  "timezone": "Europe/Paris",
  "transport": {
    "network": "Envia'Bus",
    "logo": "/icons/transport-logo.png"
  }
}
```

## Installation et lancement

```bash
npm install
npm run dev       # développement : http://localhost:3000
npm run build     # build de production
npm run start     # démarrage en production
```

## Contributions

Any feature requests and pull requests are welcome!

## License

The project is under [MIT license](https://choosealicense.com/licenses/mit/).
