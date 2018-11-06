import $ from './jquery';
    class Beer { //class
        constructor (name, description, image_url, abv, ibu, ph, tagline, ingredients) {
        this.name = name;
        this.description = description;
        this.image_url = image_url;
        this.abv = abv;
        this.ibu = ibu;
        this.ph = ph;
        this.tagline = tagline;
        // this.malt = ingredients.malt;
        // this.hops = ingredients.hops;
        // this.yeast = ingredients.yeast
        }
        getBeerData(){ //method
            return `<article class="item-containers"><figure><img src=${this.image_url} alt="${this.name}"></figure>
            <div class="item-description"><h1>${this.name}</h1>
            <p>${this.description}</p></div>
            <ul class="item-values"><li>ABV<span>${this.abv}</span></li><li>IBU<span>${this.ibu}</span></li><li class="alert-low">pH<span>${this.ph}</span></li></ul></article>`
        }   
        // ${this.name}
        // getBeerDetData(){
        //     let maltString = '';
        //     let hopsString = '';
        //     let yeastString = '';

        //     // let malt = array.malt;
        //     let hops = array.hops;
        //     let yeast = array.yeast;

            // for (let i = 0; i < malt.length; i++) {
            //     // console.log(malts[i].name);
            //     // console.log(malts[i].value);
            //     // console.log(malts[i].unit);
            //     maltString += `${malt[i].name} (${malt[i].amount.value} ${malt[i].amount.unit}),`
            // }
            
            
    //         for (let i = 0; i < hops.length; i++) {
    //             hopsString += `${hops[i].name} (${hops[i].amount.value} ${hops[i].amount.unit}),`
    //         }
    //         for (let i = 0; i < yeast.length; i++) {
    //             yeastString += `${yeast[i].name},`
    //         }
    //         return `<article class="section-detail">
    //   <div class="item-containers quick-section">
    //     <figure>
    //       <img src="https://images.punkapi.com/v2/192.png" alt="Trashy Blonde Beer">
    //     </figure>
    //     <div class="item-description">
    //       <h1>Trashy Blonde</h1>
    //       <h2>Unleash the Yeast Series</h2>
    //       <p>The bar tab of another hops is green. A Guiness beyond a black velvet, a Long Trail Ale, and a crazy Hoptoberfest are what made America great! Indeed, a Labatts related to the bar tab wastedly organizes the self-actualized Strohs.</p>
    //     </div>
    //     <ul class="item-values">
    //       <li>ABV<span>7.2</span></li>
    //       <li>IBU<span>59</span></li>
    //       <li class="alert-low">pH<span>4.4</span></li>
    //     </ul>
    //     <button class="btn-item-modal">Ingredients</button>
    //     <button class="btn-section-another">Give me another beer</button>
    //   </div>
    //   <!-- modal pop-up -->
    //   <div class="modal-container">
    //     <h3 class="modal-tittle">Ingredients: <span class="modal-closed">X</span></h3>
    //     <div class="modal-description">
    //       <h3>Malt:</h3>
    //       <p>Extra Pale(4.5 kilogrames)</p>
    //       <h3>Hops:</h3>
    //       <p>Extra Pale(4.5 kilogrames)</p>
    //       <h3>Yeast:</h3>
    //       <p>Extra Pale(4.5 kilogrames)</p>
    //     </div>

    //   </div>
    // </article>`

        // }
    }

    // class BeerIngredients{
    //     constructor (malt, malt.name){
    //         this.ingredients.malt = malt;
    //         this.ingredients.malt.name = malt.name;
    //     }
    // }

    // set some initial variables
    var $beersWrap = $('.grid-container');

//   var getLyric, $lirycWrapper = $('.lyric-wrapper');
   
  // when the form is submitted
    //$(".all").on('click', function(){
        //button is active
        $(".all").addClass("active", 10000);

// declare url for the API
    var url = "https://api.punkapi.com/v2/beers?page=1&per_page=6"; //get beers
    $.ajax({  
        url: url,
        method: 'GET',
    }).done(function(data){
            $beersWrap.empty();
            for(let i=0; i<data.length; i++){
                //calling the data by the class
                let beer = new Beer(data[i].name, data[i].description, data[i].image_url, data[i].abv, data[i].ibu, data[i].ph, data[i].tagline, data[i].ingredients);
                $beersWrap.append(beer.getBeerData());
            }

            // method> create the function e.a print it into the page
            // properties=>name, description...description
            // object=> one beers
    });

    $(".pag-number").on('click', "li", function() { //paginacion
        $(this).siblings().removeClass("active");
        $(this).addClass("active");

        var page = $(this).text();
         console.log(page);

        var url = "https://api.punkapi.com/v2/beers?page=" + page + "&per_page=80";
        $.ajax({  
            url: url,
            method: 'GET',
        }).done(function(data){
            $beersWrap.empty();
            for(let i=0; i<6; i++){
                //calling the data by the class
                let beer = new Beer(data[i].name, data[i].description, data[i].image_url, data[i].abv, data[i].ibu, data[i].ph);
                $beersWrap.append(beer.getBeerData());
            }
        });

//         if (){
//             $( "div" )
//   .css( "background", "#c8ebcc" )
//   .filter( ".middle" )
//     .css( "border-color", "red" );
//         }
    });





    // .fail(function() {
    //     $('.user-name').append('Sorry there was an error. Try again.');
    //  });





// function newFunction() {
//     let getBeerData;
//     return getBeerData;
// }

