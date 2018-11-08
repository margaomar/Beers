import $ from './jquery';
    beerHomeBeer(); // call the homepage

    class Beer { //class
        constructor (name, description, image_url, abv, ibu, ph, tagline, ingredients) {
        this.name = name;
        this.description = description;
        this.image_url = image_url;
        this.abv = abv;
        this.ibu = ibu;
        this.ph = ph;
        this.tagline = tagline;
        this.malt = ingredients.malt;
        this.hops = ingredients.hops;
        this.yeast = ingredients.yeast
        }
        getBeerData(){ //method
            return `<article class="item-containers"><figure><img src=${this.image_url} alt="${this.name}"></figure>
            <div class="item-description"><h1>${this.name}</h1>
            <p>${this.description}</p></div>
            <ul class="item-values"><li>ABV<span>${this.abv}</span></li><li>IBU<span>${this.ibu}</span></li><li class="alert">pH<span>${this.ph}</span></li></ul></article>`
        }   
        // ${this.name}
        getBeerDetData(){
            
            // for (let i = 0; i < yeast.length; i++) {
                // yeastString += `${yeast[i].name},`
            // }
            // console.log(maltString)
            // console.log(hopsString)
            // console.log(yeastString)
            return `<article class="section-detail">
                        <div class="item-containers quick-section">
                            <figure>
                                <img src=${this.image_url} alt="${this.name}"></figure>
                            <div class="item-description">
                            <h1>${this.name}</h1>
                            <h2>${this.tagline}</h2>
                            <p>${this.description}</p>
                            </div>
                            <ul class="item-values">
                            <li>ABV<span>${this.abv}</span></li>
                            <li>IBU<span>${this.ibu}</span></li>
                            <li class="alert">pH<span>${this.ph}</span></li>
                            </ul>
                            <button class="btn-item-modal">Ingredients</button>
                            <button class="btn-section-another">Give me another beer</button>
                        </div>
                        
                    </article>`

        }
        getBeerModal(){ //pop up information
            let maltString = '';
            let hopsString = '';
            let yeastString = this.yeast;

            let malt = this.malt;
            let hops = this.hops;

            // console.log("a", this.malt, this.hops, this.yeast)
            // for (let i = 0; i < 1; i++) {
            //     // let maltName = malt[i].name;
            //     // console.log(malt[i].value);
            //     // console.log(malt[i].unit);
            //     maltString += `${malt[i].name} (${malt[i].amount.value} ${malt[i].amount.unit}),`
            // }
            maltString += `${malt[0].name} (${malt[0].amount.value} ${malt[0].amount.unit})`

            // console.log("maltString", maltString);
            
            // for (let i = 0; i < hops.length; i++) {
            //     hopsString += `${hops[i].name} (${hops[i].amount.value} ${hops[i].amount.unit}), `
            // }
            hopsString += `${hops[0].name} (${hops[0].amount.value} ${hops[0].amount.unit})`

            return `<div class="modal-container">
                        <h3 class="modal-tittle">Ingredients <span class="modal-closed">X</span></h3>
                        <div class="modal-description">
                            <h3>Malt:</h3>
                            <p>${maltString}</p>
                            <h3>Hops:</h3>
                            <p>${hopsString}</p>
                            <h3>Yeast:</h3>
                            <p>${yeastString}</p>
                        </div>
                    </div>`
        }
        
    }//close class Beer
    
    function getPickABeer(){
        return `<article class="section-detail">
                    <div class="item-containers pick-section">
                    <h1 class="tittle">Pick a Beer</h1>
                    <form>
                        <div class="form-group-one">
                            <label for="name">Name</label>
                            <input type="text" class="form-control" id="name" aria-describedby="name">
                            <label for="hops">Hops</label>
                            <input type="text" class="form-control" id="hops" aria-describedby="hops">
                        </div>
                        <div class="form-group-two">
                            <label for="abv">ABV</label>
                            <input type="text" class="form-control" id="abv" aria-describedby="abv">
                            <label for="ibu">IBU</label>
                            <input type="text" class="form-control" id="ibu" aria-describedby="ibu">
                            <label for="ebc">EBC</label>
                            <input type="text" class="form-control" id="ebc" aria-describedby="ebc">
                        </div>
                        <div class="form-button">
                            <button type="submit" class="beer-find">Find Beer</button>
                        </div>
                    </form> 
                    </div>
                </article>`
    }


    //change alert colour on the different beers ph values
    function $alertColour(alertColour){              
        // console.log(alertColour);
        if(alertColour > 5.1){
            $('.alert').addClass("alert-hight");
        }else if(alertColour < 5.1 && alertColour > 4.3){
            $('.alert').addClass("alert-medium");
        }else if(alertColour <= 4.3){
            $('.alert').addClass("alert-low");
        }else{
            alert('this is not possible');
        }
    };
    

    // set some initial variables
    var $beersWrap = $('.grid-container');
   
  // when the form is submitted
    //$(".all").on('click', function(){
        //button is active
        // $(".all").addClass("active", 10000);
    
    //Add active to main page
    // $('.beers').siblings().removeClass("active");
    // $('.beers').addClass("active");

    //Add active class when press on beers
    $(".beers").on('click', function() {
        $(this).siblings().removeClass("active");
        $(this).addClass("active");
        beerHomeBeer(); //call the homepage

        // add second menu again
        $('.main-menu').removeClass('hide');
        $('header').removeClass('hide-nav');
    });
    
    //Get homepage
    // declare url for the API
    function beerHomeBeer(){
        var url = "https://api.punkapi.com/v2/beers?page=1&per_page=6"; //Get beers homepage
        $.ajax({  
            url: url,
            method: 'GET',
        }).done(function(data){
                $beersWrap.empty();
                for(let i=0; i<data.length; i++){
                    //calling the data by the class Beer
                    let beer = new Beer(data[i].name, data[i].description, data[i].image_url, data[i].abv, data[i].ibu, data[i].ph, data[i].tagline, data[i].ingredients);
                    $beersWrap.append(beer.getBeerData());
                
                    //change alert value colour into the loop
                    let alertColour = data[i].ph;
                    $alertColour(alertColour);

                    //add active class
                    $('.beers').addClass("active");
                };
                // method> create the function e.a print it into the page
                // properties=>name, description...description
                // object=> one beers
        });
    }; //ends function beerHomeBeer

    //filter
    // $(".kegs").on('click', function() {
    // });

    // const result = data.filter(data => "image_url"="https://images.punkapi.com/v2/keg.png");


    //Paginacion
    $(".pag-number").on('click', "li", function() { //Paginacion
        $(this).siblings().removeClass("active");
        $(this).addClass("active");

        // add second menu again
        $('.main-menu').removeClass('hide');
        $('header').removeClass('hide-nav');
        
        var page = $(this).text();
        var url = "https://api.punkapi.com/v2/beers?page=" + page + "&per_page=6";
        $.ajax({  
            url: url,
            method: 'GET',
        }).done(function(data){
            $beersWrap.empty();
            for(let i=0; i<6; i++){
                //calling the data by the class Beer
                let beer = new Beer(data[i].name, data[i].description, data[i].image_url, data[i].abv, data[i].ibu, data[i].ph, data[i].tagline, data[i].ingredients);
                $beersWrap.append(beer.getBeerData());

                //change alert value colour into the loop
                let alertColour = data[i].ph;
                $alertColour(alertColour);
            }
        });
    });

    // Random
    $('.quick-find').on('click', random);// Random call on click
    function random(){ //Quick find (Random) + modal, using getBeerDetData
        $(this).siblings().removeClass("active");
        $(this).addClass("active");
        $(".pagination").addClass("hide");

        var url = "https://api.punkapi.com/v2/beers/random";
        $.ajax({  
            url: url,
            method: 'GET',
        }).done(function(data){
            $beersWrap.empty();
            for(let i=0; i<1; i++){
                //calling the data by the class Beer
                // console.log(data);
                // console.log(i);
                let beer = new Beer(data[i].name, data[i].description, data[i].image_url, data[i].abv, data[i].ibu, data[i].ph, data[i].tagline, data[i].ingredients);
                $beersWrap.append(beer.getBeerDetData());

                //change alert value colour into the loop
                let alertColour = data[i].ph;
                $alertColour(alertColour);

                //remove second menu
                $('.main-menu').addClass('hide');
                $('header').addClass('hide-nav');

                //get the modal info
                // $beersWrap.append(beer.getBeerDetData());

                //getBeerModal()
                $('.btn-item-modal').on('click', function() {
                    // $(this).getBeerModal().trigger();
                    $('.section-detail').append(beer.getBeerModal());
                    $('.modal-backdrop').addClass('show');
                });
                $('.grid-container').on('click', '.modal-closed', function(){
                    $('.modal-container').addClass('hide');
                    $('.modal-backdrop').removeClass('show');
                });
                
            }
        });
    };
    // random(); // call the function to be able to works when you click on random
    

    


    // $('.grid-container').on('click', ".btn-section-another", function() { // Another beer random button call
    //     random(); //call random
    // });
    $('.grid-container').on('click', ".btn-section-another", random);// Another beer random button call

    // Pick a beer section
    $('.pick-beer').on('click', function(){
        $beersWrap.empty();
        $beersWrap.append(getPickABeer());
        $(this).siblings().removeClass("active");
        $(this).addClass("active");
    });
    console.log(getPickABeer);

    // $(this).siblings().removeClass("active");
    // $(this).addClass("active");
    // $(".pagination").addClass("hide");

    // .fail(function() {
    //     $('.user-name').append('Sorry there was an error. Try again.');
    //  });





// function newFunction() {
//     let getBeerData;
//     return getBeerData;
// }

