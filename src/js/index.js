import $ from './jquery';


    // set some initial variables
    var $beersWrap = $('.grid-container');

//   var getLyric, $lirycWrapper = $('.lyric-wrapper');
   
  // when the form is submitted
    //$(".all").on('click', function(){
        //button is active
        $(".all").addClass("active", 10000);

// declare url for the API
    var url = "https://api.punkapi.com/v2/beers";
    $.ajax({  
        url: url,
        method: 'GET',
    }).done(function(data){
        
        class Beer {
            constructor (name, description, image_url, abv, ibu, ph, tagline) {
              this.name = name;
              this.description = description;
              this.image_url = image_url;
              this.abv = abv;
              this.ibu = ibu;
              this.ph = ph;
              this.tagline = tagline;
           }
            getBeerData(){
               return `<article class="item-containers"><figure><img src=${this.image_url} alt="${this.name}"></figure>
               <div class="item-description"><h1>${this.name}</h1>
               <p>${this.description}</p></div>
               <ul class="item-values"><li>ABV<span>${this.abv}</span></li><li>IBU<span>${this.ibu}</span></li><li class="alert-low">pH<span>${this.ph}</span></li></ul></article>`
           }
        }

        class BeerIngredients{
            constructor (malt, maltName){
                this.ingredients.malt = malt;
                this.ingredients.malt.name = maltName;
            }
        }


        
        
        // console.log(getBeerData);
                    

            $beersWrap.empty();
            for(let i=0; i<6; i++){
                //calling the data by the class
                let beer = new Beer(data[i].name, data[i].description, data[i].image_url, data[i].abv, data[i].ibu, data[i].ph);
                $beersWrap.append(beer.getBeerData());
            }

            // method> create the function e.a print it into the page
            // properties=>name, description...description
            // object=> one beers
    })
    .fail(function() {
        $('.user-name').append('Sorry there was an error. Try again.');
     });






function newFunction() {
    let getBeerData;
    return getBeerData;
}

