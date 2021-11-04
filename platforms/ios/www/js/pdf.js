pdf.htmlToPDF({
    data: document.getElementById("lepdf").innerHTML,
    documentSize: 'A4',
    landscape: 'portrait',
    type: 'share'
}, this.success, this.failure);