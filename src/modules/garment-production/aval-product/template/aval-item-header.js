export class AvalItemHeader {

    activate(context) {
      this.context = context;
      this.data = context.items;
      this.error = context.error;
      this.options = this.context.options;
    }
  
    controlOptions = {
      control: {
        length: 12
      }
    };
  }