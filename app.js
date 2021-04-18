
	var currentpage = "accueil";

function saveLS(obj_name,obj){
	if(obj === "null" || typeof(obj) === "object"){
		obj_to_json = JSON.stringify(obj); /* transforme un objet en chaîne de caractères JSON */
		window.localStorage.setItem(obj_name,obj_to_json);
		// updateObj(obj,obj_name);
		console.log("Mise à jour localStorage de l'objet '"+obj_name+"' :");
		console.log(obj);
		return true;
	}
	console.log("Erreur lors de l'enregistrement en storageLocal de l'objet '"+obj_name+"'");
	console.log("Contenu de l'objet : "+obj);
	return false;
}

/* fonction qui récupère un élément du localStorage puis qui retourne son objet */
function getLS(nom){
	var val = window.localStorage.getItem(nom);
	if(val !== "null"){
		json_to_obj = JSON.parse(val); /* transforme une chaîne de caractères JSON en objet */
		if(typeof(json_to_obj) === "object"){
			console.log("Récupération en localStorage de l'objet '"+nom+"' :");
			console.log(json_to_obj);
			return json_to_obj;
		}
	}
	return {}; /* retourne un objet vide */
}

/* déclaration de mes variables globales */
var stock = {};
var clients = {};
var employes = {};
var fournisseurs = {};

/* initialisation des données enregistrées en localStorage sur mes variables globales */
stock = getLS("stock");
clients = getLS("clients");
employes = getLS("employes");
fournisseurs = getLS("fournisseurs");


/* fonction de suppression d'un élément dans un objet */
function deleteItem(item_name,obj_name,obj){
	delete obj[item_name];
	if(saveLS(obj_name,obj)){
		return true;
	}
	return false;
}

/* fonction de recherche d'un élément dans un objet */
function searchItem(name_item,obj_name){
	let obj = getLS(obj_name);
	if(obj && typeof(obj) === "object" && obj[name_item]){
		return obj[name_item];
	}
	console.log("L'élément '"+name_item+"' dans l'objet '"+obj_name+"' n'existe pas.");
	return false;
}

/* fonction d'affichage de tous les éléments d'un objet dans un tableau html */
function listItems(obj_name){
	let obj = getObj(obj_name);
	if(obj && obj !== "null" && typeof(obj) === "object"){
		//à compléter
	}
}




////////////////////////////////////////////
////////////////////////////////////////////
////////////////////////////////////////////
////////////////////////////////////////////
////////////////////////////////////////////



function NombreEntierPositif(nbProduit){
    if(!isNaN(nbProduit) && nbProduit %1 === 0 && nbProduit>=0){
        return true;
    } else {
        return false;
    }

}

function Stock(nom,qte){
	this[nom]=qte;
	return this;
}

function ajouterProduit(nom_obj, val1, val2) {
	if (
	  nom_obj === "stock" ||
	  nom_obj === "employes" ||
	  nom_obj === "clients" ||
	  nom_obj === "fournisseurs"
	) {
	  var stock = getLS(nom_obj);
	  if (stock === null || typeof stock !== "object") {
		stock = {};
	  }
	  stock[val1] = val2;
	  if (saveLS(nom_obj, stock)) {
		$('.erreurs').html('<p style="color:green;text-align:center;">L\'objet '+nom_obj+' a bien été ajouté au stock.</p>');
	  }
	}
  }

function chercherObjet(nom, obj_name) {
	var arr = JSON.parse(localStorage.getItem(obj_name));
	var exist = arr.some(item => _.isEqual(item, nom));
	return exist;
}


function recupProduit(nomProduit){

    var stock = window.localStorage.getItem(nomProduit);

    if (stock!== null && stock>0){
        return stock;
    }else{
        return "Aucun produit en stock";
    }
}


$(document).ready(function(){

// Ajout de médicament
	$("#btn_envoyer_med").click(function(e){
		e.preventDefault();
		var nom_med = $("#medicament_nom").val();
		var qte_med = $("#medicament_qte").val();
			if(isNaN(nom_med) && nom_med !== ""){
				if(!isNaN(qte_med) && qte_med > 0 && qte_med%1 === 0 ){
					ajouterProduit("stock", nom_med,qte_med);
				}else{
					$('.erreurs').html('<p style="color:red;text-align:center;">ERREUR : Veuillez saisir une quantité étant un nombre entier supérieur à 0.</p>');
				}
			}else{
				$('.erreurs').html('<p style="color:red;text-align:center;">ERREUR : Veuillez saisir un nom composé de caractères uniquement.</p>');
			}
	});	 
	  
	

// Script des divs cachés 


	$("li, a").click(function(){
		var page = $(this).data("nom");
		var method = $(this).data("method");
		if (page !== undefined) {
			console.log(page);
			if (method === "add") {
				$("."+currentpage+"").slideUp(800,function(){
					$(".add").slideDown(800);
					currentpage = "add";
					console.log(currentpage);
					$(".add h2").html("Ajouter un "+page);
					$(".add .txt1").html("Ajouter un "+page+" à la liste");
					$(".add .header h2").html("Enregistrement d'un "+page);
					if (page==="médicament") {
						$(".add .txt2").html("Merci de rentrer le nom d'un "+page+" et sa quantité disponible pour l'ajouter.");
						$(".add .champ1").html('<input type="text" class="form-control" id="medicament_nom" placeholder="Nom du médicament">');
						$(".add .champ2").html('<input type="text" class="form-control" id="medicament_qte" placeholder="Quantité en stock">');
					} else if (page==="client") {
						$(".add .txt2").html("Merci de rentrer le nom du "+page+" et son numéro de téléphone pour l'ajouter.");
						$(".add .champ1").html('<input type="text" class="form-control" id="client_nom" placeholder="Nom du client">');
						$(".add .champ2").html('<input type="text" class="form-control" id="client_numero" placeholder="Numéro de téléphone">');
					} else if (page==="fournisseur") {
						$(".add .txt2").html("Merci de rentrer le nom du "+page+" et son adresse pour l'ajouter.");
						$(".add .champ1").html('<input type="text" class="form-control" id="fournisseur_nom" placeholder="Nom du fournisseur">');
						$(".add .champ2").html('<input type="text" class="form-control" id="fournisseur_adresse" placeholder="Adresse du fournisseur">');
					} else if (page==="employé") {
						$(".add .txt2").html("Merci de rentrer le nom de l'"+page+" et son poste actuel pour l'ajouter.");
						$(".add .champ1").html('<input type="text" class="form-control" id="employe_nom" placeholder="Nom de l\'employé">');
						$(".add .champ2").html('<input type="text" class="form-control" id="employe_poste" placeholder="Poste de l\'employé">');
					}
				});
			} else if (method === "mod") {
				$("."+currentpage+"").slideUp(800,function(){
					$(".add").slideDown(800);
					currentpage = "add";
					console.log(currentpage);
					$(".add h2").html("Modifier un "+page);
					if (page==="médicament") {
						$(".add .txt2").html("Merci de faire les changements voulus pour modifier le "+page+"");
						$(".add .txt1").html("Modifications des données d'un "+page+"");
					} else if (page==="client") {
						$(".add .txt2").html("Merci de faire les changements voulus pour modifier le "+page+"");
						$(".add .txt1").html("Modifications des données d'un "+page+"");
					} else if (page==="fournisseur") {
						$(".add .txt2").html("Merci de faire les changements voulus pour modifier le "+page+"");
						$(".add .txt1").html("Modifications des données d'un "+page+"");
					} else if (page==="employé") {
						$(".add .txt2").html("Merci de faire les changements voulus pour modifier l'"+page+"");
						$(".add .txt1").html("Modifications des données d'un "+page+"");
					}
				});
			} else if (method === "list") {
				
			} else {
				$("."+currentpage+"").slideUp(800,function(){
					$("."+page+"").slideDown(800);
					currentpage = page;
					console.log(currentpage); 
					medocsok = window.localStorage.getItem("stock");
					stock = getLS("stock");
					$('#medicaments').html('');
					if(medocsok !== null){
						[stock].map((obj) => {  
							$('.nb_med').html(Object.keys(obj).length);
							for (var i=0 ; i < (Object.keys(obj).length) ; i++) {
								$('#medicaments').append('<tr><td id="nom_med'+i+'"></td><td id="qte_med'+i+'"></td></tr>');
								$('#nom_med'+i+'').html(Object.keys(obj)[i]);
								$('#qte_med'+i+'').html(Object.values(obj)[i]);
							}
						});
					} else {
						console.log("Aucune valeur enregistrée = Rien d'affiché")
					}
				});
			}
		}
	});
});