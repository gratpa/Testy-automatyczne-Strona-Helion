class CartPage{
    get succesAlert(){
        return $("div.successbox > p");
    }
    get cartPrice(){
        return $("h3#cart-edit-summary");
    }
    get checkbox(){
        return $("form#formularz tr th.checkbox"); 
        }
    get deleteSelectedLabel() {
        return $("div#usun a");
    }
    get messageAlert(){
        return $("div.infobox > p");
    }
    async getMessageAlert():Promise<string> {
        const alert:WebdriverIO.Element = await this.messageAlert;
        await alert.waitForDisplayed();
        return await alert.getText();
    }
    async acceptDeleteAlert() {
        await browser.acceptAlert();
    }
    async clickOnDeleteSelectedLabel() {
        const label:WebdriverIO.Element = await this.deleteSelectedLabel;
        await label.scrollIntoView();
        await label.waitForDisplayed;
        await label.click();
    }
    async clickOnCheckbox() {
        const checkbox:WebdriverIO.Element = await this.checkbox;
        await checkbox.scrollIntoView();
        await checkbox.waitForDisplayed();
        await checkbox.click();

    }
    async getCartPrice():Promise<string> {
        const price:WebdriverIO.Element = await this.cartPrice;
        await price.scrollIntoView();
        await price.waitForDisplayed();
        return await price.getText();
    }
    async getSuccessAlertValue():Promise<string> {
        const  alert:WebdriverIO.Element = await this.succesAlert;
        await alert.waitForDisplayed();
        return await alert.getText();
    }

}

export default new CartPage();