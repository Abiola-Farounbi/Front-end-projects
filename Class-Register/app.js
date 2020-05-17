//Storage Controller
const StorageCtrl=(function(){








//public methods
return {
storeItem:function(item){
    let items;
    //check for items in LS
    if(localStorage.getItem('items')== null){
      items=[];
      //push new item
      items.push(item);
      //set in LS
      localStorage.setItem('items',JSON.stringify(items));
    }
    else{
      items=JSON.parse(localStorage.getItem('items'));

      //Push new item
      items.push(item);

      localStorage.setItem('items',JSON.stringify(items));


    }
},
getItemsFromStorage:function(){
  let items;
    if(localStorage.getItem('items')=== null){
      items=[]
    }
    else{
      items=JSON.parse(localStorage.getItem('items'))
    }
    return items

},
updateItemStorage: function(updatedItem){
  let items = JSON.parse(localStorage.getItem('items'));

  items.forEach(function(item, index){
    if(updatedItem.id === item.id){
      items.splice(index, 1, updatedItem);
    }
  });
  localStorage.setItem('items', JSON.stringify(items));
},
deleteItemFromStorage: function(id){
  let items = JSON.parse(localStorage.getItem('items'));
  
  items.forEach(function(item, index){
    if(id === item.id){
      items.splice(index, 1);
    }
  });
  localStorage.setItem('items', JSON.stringify(items));
},
clearItemsFromStorage: function(){
  localStorage.removeItem('items');
}


} 

})()



//item controller
     const ItemCtrl=(function(){
       //item constructor
       const Item=function(id,name,idNumber,count){
            this.id=id;
            this.name=name;
            this.idNumber=idNumber;
            this.count=count; 
       }
       //Data Structure or state
      const data={
          // items:[
          //   // {id:0,name:'john mee',idNumber:19050009, count:1},
          //   // {id:1,name:'john eat',idNumber:19050003, count:2},
          //   // {id:2,name:'john meei',idNumber:19050004, count:3}
          //  ],
          items:StorageCtrl.getItemsFromStorage(),
          currentItem:null,
          totalCount:0 
        }

      //public methods
      return{
        getItems:function(){
          return data.items;
        },
        addItem:function(name,idNumber,count){
          let ID;
          //create ID
          if(data.items.length > 0){
            ID=data.items[data.items.length -1].id +1;
          }  
          else {
            ID=0;
          }
          //COUNT TO NUMBER
          //  count=parseInt(count);
          
          // create new item
          newItem=new Item(ID, name,idNumber, count);
           //add items to the array
         data.items.push(newItem);

         return newItem;
        },
        getItemById:function(id){
          let found=null;
          //loop through the items
          data.items.forEach(function(item){
            if(item.id == id){
              found=item;
            }
          });
         return found;
        },
        updateItem:function(name,idNumber,count){
        
          let found=null;
          data.items.forEach(function(item){
            if (item.id === data.currentItem.id){
               item.name=name;
               item.idNumber=idNumber;
               item.count=count;
               found=item;
            }
          })
          return found

        },
        deleteItem:function(id){
        //get ids
        ids=data.items.map(function(item){
          return item.id;
        });

        //get index
        const index=ids.indexOf(id);

        //remove item 
        data.items.splice(index,1);



        },
        clearAllItems:function(){
         data.items=[ ]
        },
        setCurrentItem:function(item){
          data.currentItem=item;
        },
      getTotalCount:function(){
        let total=0;
        //loop through items
        data.items.forEach(function(item){
          item.count=parseInt(item.count)
          total+=item.count;

        });
        //set total count
        data.totalCount=total

        //return total
        return data.totalCount
      },
      getCurrentItem:function(){
        return data.currentItem;
      },
        logData:function(){
          return data
        }

      }


     })();

//ui controller
  const UICtrl=(function(){

    const UISelectors={
      itemList:'#item-list ',
      listItems:'#item-list li',
      addBtn:'.add-btn',
      deleteBtn:'.delete-btn',
      updateBtn:'.edit-btn',
      clearBtn:'.clear-btn',
      backBtn:'.back-btn',
      itemNameInput:'#item-name',
      itemidNumberInput:'#item-id',
      itemCountInput:'#item-count',
      totalCount:".attendance"
    }    
   


    //public methods
      return{
        
        populateItemList:function(items){
          let html=' ';

          items.forEach(function(item){
            html +=` <li class="collection-item" id="item-${item.id}"> 
                <em> ${item.count} -- </em>
                <span>  Identification No:  ${item.idNumber}</span>
                <strong><b> FullName: ${item.name}  </b></strong>
                <a href='#' class='secondary-content'>
                <i class='edit-item fas fa-pencil-alt'></i>
                </a>
               </li>`
          
              });

            //insert list items in ul
            document.querySelector(UISelectors.itemList).innerHTML=html;
        },
        getItemInput:function(){
           return{
             name:document.querySelector(UISelectors.itemNameInput).value,
             idNumber:document.querySelector(UISelectors.itemidNumberInput).value,
             count:document.querySelector(UISelectors.itemCountInput).value,
           }
        },
        addListItem:function(item){
          // show back the list
          document.querySelector(UISelectors.itemList).style.display='block ';
          //create li
          const li=document.createElement('li');
          //add class
          li.className='collection-item';
          //add ID
          li.id =`item-${item.id}`;
          //add Html
          li.innerHTML=`<em> ${item.count} -- </em>
          <span>  Identification No:  ${item.idNumber}</span>
          <strong><b> FullName: ${item.name}  </b></strong>
          <a href='#' class='secondary-content'>
          <i class='edit-item fas fa-pencil-alt'></i>
          </a>`;
          //insert item
          document.querySelector(UISelectors.itemList).insertAdjacentElement('beforeend',li)

        },
        updateListItem:function(item){
          let listItems=document.querySelectorAll(UISelectors.listItems);

          // Turn Node list into array
          listItems= Array.from(listItems);
          listItems.forEach(function(listItem){
            const itemID = listItem.getAttribute('id');
            if(itemID === `item-${item.id}`){
              document.querySelector(`#${itemID}`).innerHTML=` <em> ${item.count} -- </em>
              <span>  Identification No:  ${item.idNumber}</span>
              <strong><b> FullName: ${item.name}  </b></strong>
              <a href='#' class='secondary-content'>
              <i class='edit-item fas fa-pencil-alt'></i>
              </a>`;
            }
                    })
        },
        deletelistItem:function(id){
            const itemID=`#item-${id}`;
            const item=document.querySelector(itemID);
            item.remove();
        },
        clearInput:function(){
          document.querySelector(UISelectors.itemNameInput).value = ' ';
          document.querySelector(UISelectors.itemidNumberInput).value = ' ';
         document.querySelector(UISelectors.itemCountInput).value = ' ';
        },
        addItemToForm:function(){
          document.querySelector(UISelectors.itemNameInput).value =  ItemCtrl.getCurrentItem().name;
          document.querySelector(UISelectors.itemidNumberInput).value =  ItemCtrl.getCurrentItem().idNumber;
         document.querySelector(UISelectors.itemCountInput).value =  ItemCtrl.getCurrentItem().count;
         UICtrl.showEditState();

        },
        removeItems:function(){
        let listItems=document.querySelectorAll(UISelectors.listItems);
        //turn node list into array
        listItems=Array.from(listItems);
        listItems.forEach(function(item){
             item.remove()
        })

        },
        hideList:function(){
          document.querySelector(UISelectors.itemList).style.display="none"
        },
        showTotalCount:function(totalCount){
          document.querySelector(UISelectors.totalCount).textContent = totalCount;
        },
        clearEditState:function(){
            UICtrl.clearInput();
            document.querySelector(UISelectors.updateBtn).style.display='none '
            document.querySelector(UISelectors.deleteBtn).style.display='none '
            document.querySelector(UISelectors.backBtn).style.display='none'
            document.querySelector(UISelectors.addBtn).style.display='inline '
        }, 
        showEditState:function(){
          document.querySelector(UISelectors.updateBtn).style.display='inline '
          document.querySelector(UISelectors.deleteBtn).style.display='inline '
          document.querySelector(UISelectors.backBtn).style.display='inline'
          document.querySelector(UISelectors.addBtn).style.display='none '
      },
        getSelectors:function(){
          return UISelectors;
       }

      }
  })();

//App controller
  const App =(function(ItemCtrl,UICtrl,StorageCtrl){
    // load event listeners
    const loadEventListners=function(){
      //get uiselectors from the uicontroller
        const UISelectors=UICtrl.getSelectors();
     //add item event
    document.querySelector(UISelectors.addBtn).addEventListener('click',itemAddSubmit);

    //disable submit on enter
    document.addEventListener('keypress',function(e){
      if(e.keyCode === 13 || e.which === 13){
        e.preventDefault();
        return false;
      }
    });

    //targetting the edit icon
    document.querySelector(UISelectors.itemList).addEventListener('click',itemEditSubmit);
      
      //targetting update item event
      document.querySelector(UISelectors.updateBtn).addEventListener('click',itemUpdateSubmit);

      //Back button event
       document.querySelector(UISelectors.backBtn).addEventListener('click',UICtrl.clearEditState);

        // Clear items event
        document.querySelector(UISelectors.clearBtn).addEventListener('click', clearAllItemsClick);

       //delete item event
        document.querySelector(UISelectors.deleteBtn ).addEventListener('click',itemDeleteSubmit);

    }
    //Add item submit
    const itemAddSubmit=function(e){
     //get form input from uictrl
     const input=UICtrl.getItemInput();
     //check for empty input
     if(input.name !== ''&&  input.count !== " " && input.idNumber !== " "){
          // add item to data structure
        const newItem=ItemCtrl.addItem(input.name,input.idNumber,input.count);

        //add item to UI
        UICtrl.addListItem(newItem);
        
        //get total count
        const totalCount=ItemCtrl.getTotalCount()

        //add total count to UI
        UICtrl.showTotalCount(totalCount);

     //store in localStorage
     StorageCtrl.storeItem(newItem)

        //clear input fields
        UICtrl.clearInput()
     }



      e.preventDefault();
    }
    //click edit item
    const itemEditSubmit=function(e){
      if(e.target.classList.contains('edit-item')){
        //get list item id
        const listId=e.target.parentNode.parentNode.id;
        //break into an array
        const listIdArr=listId.split('-');

        //get id
        const id=parseInt(listIdArr[1]);
        //get item
        const itemToEdit=ItemCtrl.getItemById(id);

      //set current Item
      ItemCtrl.setCurrentItem(itemToEdit);

      //add item to form
      UICtrl.addItemToForm();
      }

     
    }
     //Update item submit
     const itemUpdateSubmit=function(e){
      //Get Item Input
      const input = UICtrl.getItemInput();

      //Update Item
      const updatedItem=ItemCtrl.updateItem(input.name,input.idNumber,input.count);

      //update UI
      UICtrl.updateListItem(updatedItem);

        //get total count
      const totalCount=ItemCtrl.getTotalCount()

      //add total count to UI
      UICtrl.showTotalCount(totalCount);
      
       // Update local storage
     StorageCtrl.updateItemStorage(updatedItem);



      UICtrl.clearEditState();

      e.preventDefault();
    }
    const itemDeleteSubmit=function(e){
      //get current item
      const currentItem=ItemCtrl.getCurrentItem();

      //delete from data structure
      ItemCtrl.deleteItem(currentItem.id);

      //delete from ui
      UICtrl.deletelistItem(currentItem.id)
           //get total count
           const totalCount=ItemCtrl.getTotalCount()

           //add total count to UI
           UICtrl.showTotalCount(totalCount);

           //delete from LS
           StorageCtrl.deleteItemFromStorage(currentItem.id);

   
     
           UICtrl.clearEditState();
      e.preventDefault();
    }

     // Clear items event
  const clearAllItemsClick = function(){
    // Delete all items from data structure
    ItemCtrl.clearAllItems();

   
//get total count
const totalCount=ItemCtrl.getTotalCount()

//add total count to UI
UICtrl.showTotalCount(totalCount)
    // Remove from UI
    UICtrl.removeItems();

    //clear from LS
    StorageCtrl.clearItemsFromStorage();

    // Hide UL
    UICtrl.hideList();
    
  }
 
      //public methods
    return{
      init:function(){
        // clear edit state
        UICtrl.clearEditState();

        //Collecting items from data structures 
        const items=ItemCtrl.getItems();

        // checl if any items
        if(items.length == 0){
          UICtrl.hideList();
        }
        else{
           //populate ui with items
        UICtrl.populateItemList(items);
        }

        //get total count
        const totalCount=ItemCtrl.getTotalCount()

        //add total count to UI
        UICtrl.showTotalCount(totalCount);
       

        //load event listeners
        loadEventListners();

      }
    }
        
  })(ItemCtrl,UICtrl,StorageCtrl); 

  App.init(); 