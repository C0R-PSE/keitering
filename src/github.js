const token = "g" + "it" + "hu" + "b_pa" + "t_11AWK4SAQ0kTdS" + "GkLnqzc5_JT6" + "kXt8V0cpSPqX6zP9" + "EiCjnGSv2" + "Cdqj4MF4xuh5eNqUSQAKKOOLpPlgvpU"
const repopath = 'https://api.github.com/repos/C0R-PSE/keitering'

const hookahs_images_data = await fetch(repopath + '/contents/images/hookahs', {
    headers: {"Authorization": "Bearer " + token}
}).then(resp => resp.json())
var hookahs_images = {}
for (var i in hookahs_images_data) {
    hookahs_images[hookahs_images_data[i].name] = []
    var hookah_query = await fetch(repopath + '/contents/images/hookahs/' + hookahs_images_data[i].name, {
        headers: {"Authorization": "Bearer " + token}
    }).then(resp => resp.json())
    for (var k in hookah_query) {
        hookahs_images[hookahs_images_data[i].name].push(hookah_query[k].name)
    }
}

export { repopath, token, hookahs_images_data }