`````
Component / Navigation

# Breadcrumb

Used to display the location of the current page and quickly return to the history page.
`````

## Basic Properties

### Definition

Breadcrumbs are auxiliary navigation components that help user locate their current position and allow them to return upwards.



### Anatomy

A breadcrumb consists of text labels and separators.

| Anatomy&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | Description |
| :------ | :---- |
| 1.Text labels | Text labels are used to indicate the name of the page. Text labels can be replaced with icons. |
| 2.Separator   | Used to separate each level of pages. The default separator is (/). The default separator can be replaced with other delimiters or indicative icons, e.g. right arrow (>), middle dot (-), etc. |

![1.2 面包屑构成](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/8ad62c7bd8ed24bad807c452c261ba0a.png~tplv-uwbnlip3yd-png.png)


### Size

The size of the breadcrumbs can be defined according to the actual scene. Two common sizes are 14px and 12px.

**How to choose the size of the breadcrumbs?**
The breadcrumbs act as a navigation aid for the user and should not be the first thing that draws the user's attention to the page when they arrive. Therefore the size of the breadcrumbs should be at least smaller than the main navigation menu.


### Status
| Anatomy&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | Status |
| :------ | :---- |
| 1. Parent pages | By default, parent pages are clickable links. |
| 2. Separator   | Non-interactive |
| 3. Current page   | Non-interactive |


![1.4 面包屑状态](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/054fdff292f0e282277310589b8f3d6a.png~tplv-uwbnlip3yd-png.png)

---

## When to use

### Hierarchical websites websites
When your website has two or more page levels and it is a multi-level structure with clear categories, breadcrumbs should be used to assist users in navigating between pages.

### Breadcrumbs with drop-down menus
It shows the related pages of the parent page, providing a more flexible way to navigate while making the user aware of their location and facilitating faster access to the entire site.

![2.2 带有下拉菜单的面包屑](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/8452ce2f38a861bbe8ecb8445d542705.png~tplv-uwbnlip3yd-png.png)


### Meatball menu

When space is limited (for example if more than five levels of breadcrumbs appear), the omissions menu can be used to truncate the breadcrumbs. The first and last two page links should be shown，the rest of the crumbs are put away in the omission menu.

![2.3 省略菜单](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/972d2da7c1b98d78a1d61adac584a1c3.png~tplv-uwbnlip3yd-png.png)

---

## When not to use
### Breadcrumbs and Back buttons
When the site hierarchy / structure is flat, it is recommended to use back buttons instead of the breadcrumbs. In general, the breadcrumb component is not recommended for pages with a back button.

### Breadcrumbs should not replace the global navigation

Breadcrumbs should not replace the global navigation bar. Pages should still use the regular navigation menu.


### Use Steps for a multi-step process

Breadcrumbs as a navigation component should not be used in scene where the user is guided through a multi-step process, when a Steps component should be used.

---

## Layout

Breadcrumbs are located in the top left corner of the page or module and should also be located under the main navigation or heading on the page.

![4.0 布局](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/4fe31946a2c1ccbc795a867768f61fcc.png~tplv-uwbnlip3yd-png.png)

---

## Content

Keep breadcrumb text tags as short and clear as possible. Page names at all levels should be short and accurately reflect the content of the page.Excessively long text content should be avoided.

If the breadcrumb text tag is too long, there are two ways to use it：
**1. Text tag truncation**
Use an ellipsis to truncate the content, and after the mouse hover, a tooltip should be used to display the full content.

**2. Shorter alternatives**
Use shorter alternatives to avoid breadcrumbs for long text labels.

![5.0 文案指南](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a91382a3d0a687dd08f1d1ee71a1cba7.png~tplv-uwbnlip3yd-png.png)

---

## Interaction

**Mouse click**
By default, neither the breadcrumb separator nor the current page is clickable. Breadcrumbs with links added can be clicked on to jump to the corresponding page.

---


## Related

[Link](/react/components/link)

[Steps](/react/components/steps)

[PageHeader](/react/components/page-header)

[Menu](/react/components/menu)

---

## A little history 🎀
Long, long ago when siblings Hansel and Gretel were abandoned in the woods by their extremely poor (in more ways than one) parents, they conceived an ingenious way to find their way back home: Drop breadcrumbs. Nevermind the fact that birds ended up eating the bits of bread, causing the two lost children to be kidnapped and nearly cooked by an old witch.
