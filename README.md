# Interface Météo — Transports en Commun

Application météo destinée aux écrans d'information des réseaux de transport en commun.

## Configuration de la ville

l'API utilise le geocoding Open-Meteo pour trouver automatiquement les coordonnées et le timezone à partir du nom de la ville pour cela éditez le fichier `config/city.json` avant déploiement :

Pour changer de ville, il suffit de modifier uniquement "city" dans le JSON.

Exemple: Remplacer Quissac par Nantes.

```json
{
  "city": "Quissac",
  "country": "FR",
  "transport": {
    "network": "simplon transport",
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
