import {Component, OnInit, NgModule} from '@angular/core';
import {NoteService} from '../../services/index';

@Component({
    selector: 'material-list',
    templateUrl: './materiallist.template.html',
    
})

export class MaterialListComponent implements OnInit{
    materials;
    loading: boolean;
    constructor(private _noteService: NoteService){
        this.loading = false;
    }

    ngOnInit(){
        //get all not
        this.loading = true;
        this._noteService.getNotes().subscribe((res)=>{                            
                                if(res.state=='success'){
                                    this.materials = res.docs;
                                    this.loading = false;     
                                    console.log(this.materials);                               
                                }else{
                                    console.log(res.mesg);
                                }
                          },
                          (err)=>{

                          });
    }
}
