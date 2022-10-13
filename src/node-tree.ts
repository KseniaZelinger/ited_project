export class NodeTree {
    reverse(str: string): string {
        var newString = "";
        for (var i = str.length - 1; i >= 0; i--) {
            newString += str[i];
        }
        return newString;

    }
}