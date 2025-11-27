import { MissionStep } from './types';

export const APP_TITLE = "OPÉRATION AZUR";
export const AGENT_NAME = "Nomade";
export const AGENT_CODENAME = ""; // Left empty as requested to only show "Nomade"

// Codes to be given to contacts
// Step 1 -> 2: 1860
// Step 2 -> 3: 0600
// Step 3 -> 4: 1945
// Step 4 -> Final: BERLIN

export const MISSION_STEPS: MissionStep[] = [
  {
    id: 1,
    title: "Étape 1 : Le Théâtre de Lumière",
    locationName: "Place Masséna",
    context: "Point de départ au niveau de la Fontaine du Soleil, avec Apollon au centre de la place et les façades rouges tout autour.",
    clue: "Agent Nomade, te voilà au cœur du réseau, sous le regard d’un dieu entouré de cinq sentinelles. Quand on quitte ce théâtre de lumière, on traverse un ruban de verdure où les arbres étouffent les conversations. Cherche un banc d’où l’on entend encore la ville, mais où l’on voit plus de feuilles que de façades : ton prochain contact t’y attend.",
    unlockCode: "1860" 
  },
  {
    id: 2,
    title: "Étape 2 : Le Couloir Silencieux",
    locationName: "Jardin Albert Ier",
    context: "Grand espace vert entre la place et la mer, souvent perçu comme un couloir végétal avec vue vers la Baie des Anges.",
    clue: "Tu es désormais dans le couloir silencieux qui relie le cœur battant de la ville à l’horizon bleu. Un ancien agent montait toujours plus haut pour avoir l’avantage : il disait que là-haut, on pouvait surveiller la Baie des Anges, les toits de la vieille ville et le port en un seul coup d’œil. Grimpe là où les escaliers semblent ne jamais finir ou prends l’ascenseur des ombres : ton prochain message t’attend au point où la ville, la mer et le port se dessinent ensemble.",
    unlockCode: "0600"
  },
  {
    id: 3,
    title: "Étape 3 : Le Nid d'Aigle",
    locationName: "Colline du Château",
    context: "Parc en hauteur, belvédères avec vues très claires sur le port d’un côté et la Baie des Anges de l’autre.",
    clue: "De ce nid d’aigle, tu vois le véritable échiquier de la mission : à ta gauche s’étend la courbe parfaite de la Baie des Anges, à ta droite un alignement de coques prêtes à prendre le large. Le réseau des Ombres de la Riviera aimait se fondre parmi les amarres et les façades colorées. Descends vers la mer là où les bateaux attendent, et trouve ton contact près de l’eau, non loin des quais.",
    unlockCode: "1945"
  },
  {
    id: 4,
    title: "Étape 4 : Le Nœud Maritime",
    locationName: "Port Lympia",
    context: "Port de Nice, entouré d’immeubles colorés, point charnière entre le vieux centre et la mer.",
    clue: "Tu as atteint le nœud maritime de l’opération, là où les messages voyagent plus vite que les vagues. La dernière transmission parle d’un lieu au cœur de la ville, dans une rue qui porte le nom de ce que recherchent tous les agents : la liberté. Remonte vers le centre, suis les rails et les grands boulevards si besoin, jusqu’à trouver une adresse précise : numéro 1. C’est là que ton commandement t’attend.",
    unlockCode: "BERLIN",
    isFinal: true
  }
];

export const FINAL_REVEAL = {
  title: "MISSION ACCOMPLIE",
  locationName: "1 Rue de la Liberté",
  message: "Agent Nomade,\n\nOpération Azur est un succès. Les Ombres de la Riviera ont été neutralisées grâce à toi.\n\nTon prochain dossier t’attend dans une autre capitale, plus au nord, là où les murs ont jadis séparé un monde en deux. Prépare ton équipement : ta nouvelle mission commence à Berlin.\n\nBon anniversaire, agent."
};