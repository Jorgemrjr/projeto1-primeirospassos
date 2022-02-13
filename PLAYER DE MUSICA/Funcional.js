let musicas = [
    {titulo:'Descobridor dos Sete Mares', artista:'Tim Maia', source:'Musicas/setemares.mp3', img:'Capas/tim.png'},
    {titulo:'Dinossauros', artista:'Dingo Bells', source:'Musicas/dinossauros.mp3', img:'Capas/dinossauros.png'},
    {titulo:'Boa Vida', artista:'Cazuza', source:'Musicas/boavida.mp3', img:'Capas/cazuza.png'},
    {titulo:'Mulher de Fases', artista:'Raimundos', source:'Musicas/mulherdefases.mp3', img:'Capas/rai.png'},
    {titulo:'Você me Bagunça', artista:'O Teatro Mágico', source:'Musicas/vcmebagunca.mp3', img:'Capas/teatro.png'},
    {titulo:'Aquarela', artista:'Toquinho', source:'Musicas/aquarela.mp3', img:'Capas/aquarela.png'}
];

//INICIO
let musica = document.querySelector('audio');
let musicaIndex = 0;

let nomeMusica = document.querySelector('.descricao h2');
let nomeArtista = document.querySelector('.descricao i');
let imagem = document.querySelector('img');
let tempoDecorrido = document.querySelector('.tempo .inicio');
let duracaoMusica = document.querySelector('.tempo .fim');

nomeMusica.textContent = musicas[musicaIndex].titulo;
nomeArtista.textContent = musicas[musicaIndex].artista;
imagem.setAttribute('src', musicas[musicaIndex].img);
duracaoMusica.textContent = segundosParaMinutos(Math.floor(musica.duration));

//EVENTOS
document.querySelector('.botaoplay').addEventListener('click', tocarMusica);
document.querySelector('.botaopause').addEventListener('click', pausarMusica);
musica.addEventListener('timeupdate', atualizarBarra);

document.querySelector('.anterior').addEventListener('click', () =>{
    musicaIndex--;
    if(musicaIndex < 0){
        musicaIndex = 2;
    }
    renderizarMusica(musicaIndex);
})

document.querySelector('.proximo').addEventListener('click', () =>{
    musicaIndex++;
    if(musicaIndex > 5){
        musicaIndex = 0;
    }
    renderizarMusica(musicaIndex);
})

//FUNÇÕES

function renderizarMusica(musicaIndex){
    musica.setAttribute('src', musicas[musicaIndex].source);

    musica.addEventListener('loadeddata', () => {
        nomeMusica.textContent = musicas[musicaIndex].titulo;
        nomeArtista.textContent = musicas[musicaIndex].artista;
        imagem.src = musicas[musicaIndex].img;

        duracaoMusica.textContent = segundosParaMinutos(Math.floor(musica.duration));

    });

    document.body.append(musica)
}

function tocarMusica(){
    musica.play();
    document.querySelector('.botaoplay').style.display = 'none';
    document.querySelector('.botaopause').style.display = 'block';
}

function pausarMusica(){
    musica.pause();
    document.querySelector('.botaoplay').style.display = 'block';
    document.querySelector('.botaopause').style.display = 'none';
}

function segundosParaMinutos(segundos){
    let campoMinutos = Math.floor(segundos / 60);
    let campoSegundos = segundos % 60;

    if (campoSegundos < 10){
        campoSegundos = '0' + campoSegundos;
    }
    return `${campoMinutos}:${campoSegundos}`;

}

function atualizarBarra(){
    let barra = document.querySelector('progress');
    barra.style.width = Math.floor((musica.currentTime / musica.duration)*100) + '%';
    tempoDecorrido.textContent = segundosParaMinutos(Math.floor(musica.currentTime));
}