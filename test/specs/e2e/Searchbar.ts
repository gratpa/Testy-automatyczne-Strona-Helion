import GlobalPage from "../../pages/GlobalPage";
import SearchbarPage from "../../pages/components/SearchbarPage";
import { helionHomeUrl, notFoundUrl } from "../../config/pagesUrl";
import { incorrectSearchPhrase, notFoundAlert, searchPhrase, searchResultTitle } from "../../config/data";
import { searchPhraseUrl } from "../../config/pagesUrl";
import SearchResultPage from "../../pages/SearchResultPage";

describe('E2E - Searchbar', async() => {
    it("Should open helion home page and verify url and visible searchbar", async()=>{
        await GlobalPage.openPage(helionHomeUrl, helionHomeUrl);
        await SearchbarPage.searchBarIsVisible();
    })
    it("Should click on search icon and verify url", async()=>{
        await SearchbarPage.clickOnSearchIcon();
        await expect(browser).toHaveUrl(helionHomeUrl);
    })
    it ("Should type search value and verify visible popup", async()=>{
        await SearchbarPage.typeSearchPhrase(searchPhrase);
        await SearchbarPage.suggestPopusIsVisible();
    })
    it ("Should click on see all books button", async()=> {
        await SearchbarPage.clickOnSeeAllBookBtn();
        await expect(browser).toHaveUrl(searchPhraseUrl);
    })
    it ("Should verify visible correctly title and number of books", async()=>{
        const title:string = await SearchResultPage.getPageTitle();
        const numberOfBooks:number = await SearchResultPage.getNumberOfBooks();
        await expect(title).toContain(searchResultTitle);
        await expect(numberOfBooks).toEqual(20);
    })
    it ("Should clear input value in search button", async()=>{
        await SearchbarPage.clearSearchBar();
        await expect(await SearchbarPage.getInputValue()).toContain("");
    })
    it ("Should type incorrect book name and verify alert", async()=>{
        await SearchbarPage.typeSearchPhrase(incorrectSearchPhrase);
        await SearchbarPage.clickOnSearchIcon();
        await expect(await SearchbarPage.getNotFoundAlertText()).toContain(notFoundAlert);
    })
    it ("Should clear input value and click on search icon", async()=>{
        await SearchbarPage.clearSearchBar();
        await SearchbarPage.clickOnSearchIcon();
        await expect(browser).toHaveUrl(notFoundUrl);
        await expect(await SearchbarPage.getInputValue()).toContain(incorrectSearchPhrase);
    })
})
