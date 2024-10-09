import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PostService } from '../../Services/post.service';
import { Post } from '../../Models/Post';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.css'
})
export class PostListComponent implements OnInit{

  show : boolean = false
  sshow : boolean = false
  posts : Post[]=[]
  addForm !: FormGroup
  post!:Post
  id : number = 0
  title : string = ""
  currentPage : number = 1
  pageSize : number = 4
  constructor(private postService : PostService,private formBuilder : FormBuilder,private toastr: ToastrService){}

  ngOnInit(): void {
    this.getPosts()
    this.addForm = this.formBuilder.group({
      title : ['',[Validators.required]],
      body : ['',[Validators.required]]
    })
  }

  getPosts(){
    this.postService.getPosts().subscribe(data =>{
       if(data !=null){
          this.posts=data
          console.log(this.posts);
          
       } else {
        this.toastr.error("Error when fetching posts list")
      }
    })
  }

  showForm(){
    this.show=true
  }
  addPost(){
    this.post= this.addForm.value
    this.postService.createPost(this.post).subscribe(data => {
      if(data){
        console.log(data);
        this.posts.push(data);
        this.addForm.reset()
        this.show=false
        this.toastr.success("the post was added successfully")
      } else {
        this.toastr.error("Error when adding post")
      }
    })

  }
  edit(post:Post){
    this.id=post.id
    this.sshow=true
    this.addForm.setValue({
      title : [post.title],
      body : [post.body]
    })
  }
  editPost(){
    this.post=this.addForm.value
    console.log(this.post)
      let index = this.posts.findIndex(
        post => post.id === this.id
      )
      if(index !== -1){
        this.post.id=this.id
        this.posts[index] = this.post
      }
      this.sshow=false
      this.addForm.reset()
      this.toastr.success("the post was updated successfully")
    this.postService.updatePost(this.id,this.post).subscribe(data=>{
      if(data){
        console.log(data)
      } else {
        // this.toastr.error("Error when updating post")
      }
    })
  }

  delete(id :number){
    this.postService.deletePost(id).subscribe((data)=>{
      console.log(data);
      let index = this.posts.findIndex(post=> post.id === id)
      console.log(index)
      if(index!=-1){
        this.posts.splice(index,1)
        this.toastr.success("the post was deleted successfully")
      } 
    },error => {
      console.error()
    })
  }
}
