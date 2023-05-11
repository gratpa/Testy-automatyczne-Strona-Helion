import { helionHomeUrl, searchProductUrl, shoppingPage } from "../../config/pagesUrl";
import { searchPhrase, deleteMessage, cartMessage} from "../../config/data";
import SearchbarPage from "../../pages/components/SearchbarPage";
import SearchResultPage from "../../pages/SearchResultPage";
import ProductPage from "../../pages/ProductPage";
import CartPage from "../../pages/CartPage";

describe("E2E - Products", async() => {

    //Uwaga, stepy nie mają dostępu do siebie nawzajem, więc jeśli chcemy użyć zmiennej globalnej to wstawiamy ją tutaj:
    let productTitle: string = "";
    let price:string ="";
    before(()=>{
        browser.url(helionHomeUrl);
    })
    it("Should type search phrase and click search icon", async () =>{
        await SearchbarPage.typeSearchPhrase(searchPhrase);
        await SearchbarPage.clickOnSearchIcon();
        await expect(browser).toHaveUrl(searchProductUrl);
    })

    it ("Should click on first book", async () => {
        await SearchResultPage.clickOnFirstBookItem();
        price = await ProductPage.getBookPrice();
        await ProductPage.productTitleIsVisible();
        await ProductPage.addToCartIsVisible(); 
        productTitle = await ProductPage.getProductTitleValue();
        
    })
    it ("Should click on add to cart btn, verify website URL, visble alert and verify the price on the book page equals the price on the cart page", async() => {
        await ProductPage.clickOnAddToCartBtn();
        await expect(browser).toHaveUrlContaining(shoppingPage);
        await expect(await CartPage.getSuccessAlertValue()).toContain(productTitle);
        await expect(await CartPage.getCartPrice()).toContain(price);
    })
    it ("Should click on a checkbox an delete selected label", async () =>{
        await CartPage.clickOnCheckbox();
        await CartPage.clickOnDeleteSelectedLabel();
        await expect(await browser.getAlertText()).toContain(deleteMessage);
        await CartPage.acceptDeleteAlert();
        await expect(await CartPage.getMessageAlert()).toContain(cartMessage);
    })
})