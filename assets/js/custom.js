const ele = document.getElementById('search');

ele.addEventListener('input', function (e) {
    fetch(`/api/user/blog/partial-search/?q=${e.target.value}`)
        .then(res => res.json())
        .then(data => updatView(data))
        .catch(err => console.log(err));
});


function updatView(allBlog) {
    const ele = document.getElementById('update-view');

    let html = `<div class="container mt-4"><div class="row">`;

    if (allBlog.length === 0) {
        html += `<p class="text-center">No blogs found</p>`;
    } else {
        allBlog.forEach(function (Blog) {
            html += `
            <div class="col-md-3 mb-4">
                <a style="text-decoration: none;" href="/api/user/blog/detail-page/${Blog.id}">
                    <div class="card h-100 shadow-sm">
                        ${
                            Blog.blog_img && Blog.blog_img.url
                                ? `<img src="${Blog.blog_img.url}" class="card-img-top" style="height:180px; object-fit:cover;">`
                                : ""
                        }

                        <div class="card-body">
                            <h5 class="card-title">${Blog.title}</h5>
                            <p class="card-text">${Blog.description}</p>
                            <p class="card-text">Category : ${Blog.category}</p>
                        </div>

                        <div class="card-footer text-muted" style="display:flex; flex-direction:column;">
                            <small>Posted By : ${Blog.author}</small>
                            <small>Posted Date : ${Blog.createdAt}</small>
                        </div>
                    </div>
                </a>
            </div>`;
        });
    }

    html += `</div></div>`;

    ele.innerHTML = html;
}
