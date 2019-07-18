import Expand from "esri/widgets/Expand";

const editExpand = (view, container, position) => {
    return new Promise(function (resolve, reject) {
        const editExpand = new Expand({
            expandIconClass: "esri-icon-edit",
            expandTooltip: "Expand Edit",
            expanded: true,
            view: view,
            content: document.getElementById(container)
        });
        view.ui.add(editExpand, position)
        resolve(editExpand)
    })
}
module.exports = editExpand;