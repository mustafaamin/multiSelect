# multiSelect
this select for multiple with select all
can used multiSelect for Semantic UI 

![alt tag](http://s9.postimg.org/6tqzmm1b3/image.png)

![alt tag](http://s27.postimg.org/opepoughf/image.png)
# Getting started
##Html codo
```
<select id="selectStage" multiple>
    <option value="0">Pre.KG</option>
    <option value="1">KG.1</option>
    <option value="2">KG.2</option>
    <option value="3">Prim.1</option>
    <option value="4">Prim.2</option>
    <option value="5">Prim.3</option>
    <option value="6">Prim.4</option>
    <option value="7">Prim.5</option>
    <option value="8">Prim.6</option>
    <option value="9">Prep.1</option>
    <option value="10">Prep.2</option>
    <option value="11">Prep.3</option>
    <option value="12">Sec.1</option>
    <option value="13">Sec.2</option>
    <option value="14">Sec.3</option>
</select>
```
##can used
```
$('#selectStage').multiSelect();
```
#API
```
$('#selectStage').multiSelect('loading'); // to show loading  cna stop loading when used  //refresh
$('#selectStage').multiSelect('refresh'); // to refresh select when change data option
```
##event
```
onCHange \\ when selected data and close
```
