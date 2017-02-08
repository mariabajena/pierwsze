document.getElementById("poWytypowaniu").style.display = "none";

function kliknietyGuzik() {
  var numer=sprawdzNumer ();
  if (numer==null) {return;}

  zaznaczoneDoTablicy();

  var liczby = losuj6(1,42);
  wypiszElementyListy(liczby);

  wypiszCzyTrafiony(liczby, numer);

  var tablica = zaznaczoneDoTablicy();
  ileTrafionych(liczby,tablica);
}

$('#nowaGra').click(wypiszNumery);

$('#guzik').click(kliknietyGuzik);

$('#poWytypowaniu').click(przesunTablice);

//sprawdzanie wartości wpisanego szczęśliwego numeru
function sprawdzNumer() {
  var numer = $('#numer').val();
  if (numer>42) {
    $('#wynik').html('Liczba większa od 42');
    return null;
  }
  else if (numer<1) {
    $('#wynik').html('Liczba mniejsza od 1');
    return null;
  }
  else {
    $('#wynik').html('Podana przez Ciebie liczba to ' + numer);
    return parseInt(numer);
  }
}

//wypisanie guzików z numerami od 1 do 42, które podświetlają się na czerwono prze kliknięciu
function wypiszNumery () {
  schowajGuzik();
  $('#napisWytypujLiczby').html('Najpierw wytypuj 6 liczb:');
  for (i=0; i<42; i++){
    var $guzik = $('<button>'+(i+1)+'</button>')
    if (i%7==0) {
      $('#liczby_tablica').append('<br>');
    }
    $('#liczby_tablica').append($guzik);

    $guzik.click(liczbaKliknieta);
  }
  document.getElementById("poWytypowaniu").style.display = "block";
}

function schowajGuzik() {
  $('#hide').html('');
}

function liczbaKliknieta() {
  var kliknietyGuzik = $(this);
  var czyZaznaczony = kliknietyGuzik.hasClass('active');

  $('#zaDuzoZaznaczonych').html('');

  if (czyZaznaczony) {
    kliknietyGuzik.removeClass('active');
    return;
  }

  var numItems = $('.active').length;
  if (numItems==6) {
    $('#zaDuzoZaznaczonych').html('Juz zaznaczyleś 6 liczb.');
    return;
  }

  kliknietyGuzik.addClass('active');
}

// function przesunTablice () {
//   document.getElementById("liczby_tablica").style.margin = "0 auto 0 0";
//   $('#napisWytypujLiczby').html('');
// }

  function przesunTablice() {
    document.getElementById("liczby_tablica").style.transform = ("translateX(-450px) scale(0.8,0.8)");
    document.getElementById("liczby_tablica").style.transition = ("all 1s");
    document.getElementById("napisWytypujLiczby").style.transform = ("translateX(-450px)");
    document.getElementById("napisWytypujLiczby").style.transition = ("all 1s");
    $('#napisWytypujLiczby').html('Wytypowane przez Ciebie liczby:');
    document.getElementById("napisWytypujLiczby").style.fontSize = "small";
    document.getElementById("poWytypowaniu").style.display = "none";

    $('.szczesliwy').addClass('visible');
}

//utworzenie tablicy z zaznaczonych liczb
function zaznaczoneDoTablicy (){
  var tablica=$('button.active').toArray();
  for (var i=0; i<tablica.length; i++) {
    tablica[i] = parseInt($(tablica[i]).text());
  }
  return tablica;
}

//losuje 6 liczb z przedziału 1-42
function losuj6 (min, max) {
  var liczby=[] ;
    while (liczby.length<6) {
      var liczba=Math.floor(Math.random()*(max-min+1)+min);
      if (liczby.indexOf(liczba)>=0) {
        continue;
      }
      liczby.push(liczba);
    }
  return liczby;
}

function wypiszElementyListy(liczby) {
  $('#liczby').html('')
  for (i=0; i<liczby.length; i++) {  
    $('#liczby').append('<li>'+ liczby[i] + '</li>');
  }
}

function czyTrafiony(liczby,numer) {
  return liczby.indexOf(numer)>=0;
}

function wypiszCzyTrafiony(liczby,numer) {
  $('#szczesliwy').html('');
  if(czyTrafiony(liczby,numer)) {
    $('#szczesliwy').html('Super, trafiłeś szczęśliwy numerek, czyli ' + numer);
  }
}

function ileTrafionych(liczby,tablica) {
  var trafione=[];
  for (var i=0; i<liczby.length; i++) {
    if (liczby.indexOf(tablica[i])>=0) {
      trafione.push(tablica[i]);
    }
  }
  $('#ileTrafionych').html('Trafiłeś ' + trafione.length + ' z 6 wytypowanych liczb! (' + trafione + ')');
}