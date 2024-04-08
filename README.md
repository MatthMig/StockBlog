---
title: StockBlog 
author:  
- MIGNE Matthieu
- SORIA-RAMOS Gabriel
--- 

## Cahier des charges

Nous souhaitons créer un site affichant les courbes de différents actifs bousiers et qui donne la possibilité aux utilisateurs d'interagir à leur sujet en commentant, ou en pariant sur une montée ou une descente de la valeur de l'actif à la prochaine unité de temps. Seul les utilisateurs connectés peuvent commenter et voter.

### Cas d'usage

```plantuml
@startuml
left to right direction
actor "Visitor" as v
actor "Connected User" as cu
actor "Admin" as a
rectangle StockBlog {
  usecase "Register" as R
  usecase "Connect" as CN
  usecase "Browse website views" as BWV
  usecase "Comment" as CM
  usecase "Vote" as V
  usecase "Delete his account" as DHA
  usecase "Delete his comments" as DHC
  usecase "Disconnect" as D
  usecase "Delete any account" as DAA
  usecase "Delete any comment" as DAC
}
v --> R
v --> CN
v --> BWV
cu --> BWV
cu --> CM
cu --> V
cu --> DHA
cu --> DHC
cu --> D
a --> DAA
a --> DAC
a --> cu
@enduml
```

### Maquettes

A modifier/compléter...

```plantuml
@startsalt
<style>
header {
  TextAlignement right
  BackGroundColor gray
  FontColor white
}
</style>
header {- Alice@aol.fr | [Se déconnecter] }
{
{^Mes groupes
**Ceux dont je suis membre**
* Ensimag
* Grenoble INP
* <b>Club gaming
----
**Ceux que j'administre**
* Club Gaming
* Running
"<i>nom du nouveau groupe" 
 [Créer]
}|
{^"Discussion sur le groupe <b>Club Gaming"
{SI
  [Salut , ca va? ] | Charlie
  [Super, et toi?] | Asimov
  [On se fait un truc] | Asimov
  [Une idée? ] | Charlie
  . | [Hello, oui]
  ----|----
}
{+ "Une partie de LOL après?" | [Envoyer ] }
}
}
@endsalt
```

### Captures d'écran

A compléter

### API mise en place

Donner le lien vers la documentation swagger et/ou faire un tableau récapitulant l'API

A compléter

## Architecture du code

### FrontEnd

Indiquer ici l'organisation de votre code. Et les choix faits pour le frontend.

### Backend

#### Schéma de votre base de donnée

```plantuml
class User{
  name
  email
  passhash
  isAdmin : boolean
  points
}

class Comments {
  content
}

class Votes{
  upVotes
  downVotes
}

class StockCurve{
  id
}

StockCurve "1" -- "n" Comments
StockCurve "1" -- "1" Votes
Votes "n" <-- "n" User : votes
User "1" --> "n" Comments : posts
```

#### Architecture de votre code

Indiquer ici l'organisation de votre code. Et les choix faits pour le backend.

### Gestion des rôles et droits

Expliquer ici les différents rôles mis en place, et comment ils sont gérés dans votre code.

- Coté backend

- Coté frontend


## Test

### Backend

Décrivez les tests faits au niveau du backend, leur couverture.

### Frontend

Décrivez les tests faits au niveau du backend, leur couverture.

## Intégration + déploiement (/3)

Décrivez ici les éléments mis en place au niveau de l'intégration continue 

## Installation

Donner les éléments pour installer l'application sur une machine nue à partir de votre dépôt
