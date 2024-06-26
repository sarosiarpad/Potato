export const missionsData = 
{
  basic: [
    {
      title: "Az erdő széle",
      description: "A térképed szélével szomszédos erdőmezőidért egy-egy pontot kapsz.",
      score: 0,
      img: "missions/1.png"
    },
    {
      title: "Álmos-völgy",
      description: "Minden olyan sorért, amelyben három erdőmező van, négy-négy pontot kapsz.",
      score: 0,
      img: "missions/2.png"
    },
    {
      title: "Krumpliöntözés",
      description: "A farmmezőiddel szomszédos vízmezőidért két-két pontot kapsz.",
      score: 0,
      img: "missions/3.png"
    },
    {
      title: "Határvidék",
      description: "Minden teli sorért vagy oszlopért 6-6 pontot kapsz.",
      score: 0,
      img: "missions/4.png"
    }
  ],
  "extra": [
    {
      title: "Fasor",
      description: "A leghosszabb, függőlegesen megszakítás nélkül egybefüggő erdőmezők mindegyikéért kettő-kettő pontot kapsz. Két azonos hosszúságú esetén csak az egyikért.",
      score: 0,
      img: "missions/5.png"
    },
    /*{
      title: "Gazdag város",
      description: "A legalább három különböző tereptípussal szomszédos falurégióidért három-három pontot kapsz."
    },*/
    {
      title: "Öntözőcsatorna",
      description: "Minden olyan oszlopodért, amelyben a farm illetve a vízmezők száma megegyezik, négy-négy pontot kapsz. Mindkét tereptípusból legalább egy-egy mezőnek lennie kell az oszlopban ahhoz, hogy pontot kaphass érte.",
      score: 0,
      img: "missions/7.png"
    },
    {
      title: "Mágusok völgye",
      description: "A hegymezőiddel szomszédos vízmezőidért három-három pontot kapsz.",
      score: 0,
      img: "missions/8.png"
    },
    {
      title: "Üres telek",
      description: "A városmezőiddel szomszédos üres mezőkért 2-2 pontot kapsz.",
      score: 0,
      img: "missions/9.png"
    },
    /*{
      title: "Sorház",
      description: "A leghosszabb, vízszintesen megszakítás nélkül egybefüggő falumezők mindegyikéért kettő-kettő pontot kapsz."
    },*/
    {
      title: "Páratlan silók",
      description: "Minden páratlan sorszámú teli oszlopodért 10-10 pontot kapsz.",
      score: 0,
      img: "missions/11.png"
    },
    {
      title: "Gazdag vidék",
      description: "Minden legalább öt különböző tereptípust tartalmazó sorért négy-négy pontot kapsz.",
      score: 0,
      img: "missions/12.png"
    }
  ],
}

export const elements = [
    {
        time: 2,
        type: 'water',
        shape: [[1,1,1],
                [0,0,0],
                [0,0,0]],
        rotation: 0,
        mirrored: false
    },
    {
        time: 2,
        type: 'town',
        shape: [[1,1,1],
                [0,0,0],
                [0,0,0]],
        rotation: 0,
        mirrored: false        
    },
    {
        time: 1,
        type: 'forest',
        shape: [[1,1,0],
                [0,1,1],
                [0,0,0]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 2,
        type: 'farm',
        shape: [[1,1,1],
                [0,0,1],
                [0,0,0]],
            rotation: 0,
            mirrored: false  
        },
    {
        time: 2,
        type: 'forest',
        shape: [[1,1,1],
                [0,0,1],
                [0,0,0]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 2,
        type: 'town',
        shape: [[1,1,1],
                [0,1,0],
                [0,0,0]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 2,
        type: 'farm',
        shape: [[1,1,1],
                [0,1,0],
                [0,0,0]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 1,
        type: 'town',
        shape: [[1,1,0],
                [1,0,0],
                [0,0,0]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 1,
        type: 'town',
        shape: [[1,1,1],
                [1,1,0],
                [0,0,0]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 1,
        type: 'farm',
        shape: [[1,1,0],
                [0,1,1],
                [0,0,0]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 1,
        type: 'farm',
        shape: [[0,1,0],
                [1,1,1],
                [0,1,0]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 2,
        type: 'water',
        shape: [[1,1,1],
                [1,0,0],
                [1,0,0]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 2,
        type: 'water',
        shape: [[1,0,0],
                [1,1,1],
                [1,0,0]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 2,
        type: 'forest',
        shape: [[1,1,0],
                [0,1,1],
                [0,0,1]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 2,
        type: 'forest',
        shape: [[1,1,0],
                [0,1,1],
                [0,0,0]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 2,
        type: 'water',
        shape: [[1,1,0],
                [1,1,0],
                [0,0,0]],
        rotation: 0,
        mirrored: false  
    },
]