#include <stdio.h>
#include <stdlib.h>

#define MAX 100
#define MORE 10

//------定义线性表结构------
typedef struct
{
    int *data;
    int len;
    int size;
    int size;
} List;

//------初始化线性空表------
int InitList(List *L)
{
    L->data = (int *)malloc(MAX * sizeof(int));
    //if(!L->data) return 0;
    L->len = 0;
    L->size = MAX;
    return 1;
}

//------向线性表中插入元素------
int InsertList(List *L, int i, int e)
{
    if (i < 1 || i > L->len + 1)
        return 0;
    if (L->len >= L->size) //储存空间已满，增加分配
    {
        int *newbace;
        newbace = (int *)realloc(L->data, (L->size + MORE) * sizeof(int));
        //if(!newbace) return 0;
        L->data = newbace;
        L->size += MORE;
    }
    int *q = &(L->data[i - 1]);
    for (int *p = &(L->data[L->len - 1]); p >= q; --p)
        *(p + 1) = *p;
    *q = e;
    L->len++;
    return 1;
}

//----------------直接插入排序函数------------------
void Direct_Insertion_Sort(List *L)
{
    for (int i = 1; i < L->len; i++)
    {
        int j = i;
        int t = L->data[i];
        while (j > 0 && t < L->data[j - 1])
        {
            L->data[j] = L->data[j - 1];
            j--;
        }
        L->data[j] = t;
    }
}

//---折半插入排序---
void Half_Insertion_Sort(List *L)
{
    if (L->len <= 1)
    {
        exit(-1);
    }
    else
    {
        for (int i = 1; i < L->len; i++)
        {
            int value = L->data[i];
            int low = 0;
            int high = i - 1;
            while (low <= high)
            {
                int mid = (low + high) / 2;
                if (value < L->data[mid])
                {
                    high = mid - 1;
                }
                else
                {
                    low = mid + 1;
                }
            }
            int j = i - 1;
            for (; j > high; j--)
            {
                L->data[j + 1] = L->data[j];
            }
            L->data[j + 1] = value;
        }
    }
}

//-------------------快速排序--------------------
int Partition(List *L, int low, int high)
{
    //交换顺序表L中子表L->r[low...high]的记录，使枢纽记录到位，并返回其位置
    //此时在他前（后）的元素均不大（小）于它
    int i = low - 1, t;
    for (int j = low; j < high; j++)
    {
        if (L->data[j] <= L->data[high])
        {
            i = i + 1;
            t = L->data[i];
            L->data[i] = L->data[j];
            L->data[j] = t;
        }
    }
    t = L->data[i + 1];
    L->data[i + 1] = L->data[high];
    L->data[high] = t;
    return i + 1;
}
void QuickSort(List *L, int low, int high)
{
    int mid;
    if (low < high)
    {
        mid = Partition(L, low, high);
        QuickSort(L, low, mid - 1);
        QuickSort(L, mid + 1, high);
    }
}

//-------------------堆排序--------------------
void Heap_Sort(List *L)
{
    int end = L->len - 1; //end指向最后一个元素；
    while (end != 0)      //end到根结点结束
    {
        while (1)
        {
            int pa = end / 2 - 1; //指向最后一个双亲结点；
            //printf("%d %d %d\n",a[pa],a[2*pa],a[2*pa+1]);
            int tag = 0; //判断是否还需要进行第二步；
            //将最大值移至下标为1的位置；
            while (pa >= 0) //进行一次pa从最后一个双亲结点到第一个；
            {
                if (L->data[pa] < L->data[2 * pa + 1]) //双亲与其左孩子比较；
                {
                    tag = 1;
                    int temp = L->data[pa];
                    L->data[pa] = L->data[2 * pa + 1];
                    L->data[2 * pa + 1] = temp;
                }
                //2*pa+1<=end，防止越界；
                if ((2 * pa + 1 <= end) && L->data[pa] < L->data[2 * pa + 2]) //双亲与其右孩子比较；
                {
                    tag = 1;
                    int temp = L->data[pa];
                    L->data[pa] = L->data[2 * pa + 2];
                    L->data[2 * pa + 2] = temp;
                }
                pa--; //进行--操作，移向上一个双亲；
            }
            if (tag == 0) //说明这次循环没有进行交换，说明已经找到的最大值；
            {
                //将最大值放在数组的最后一位，之后的次大值一次放这个位置的前一个位置；
                int t = L->data[0];
                L->data[0] = L->data[end];
                L->data[end] = t; //将这次找到的最大值放置在a[end]；
                break;
            }
        }
        end--; //end前移，用来放置下一个循环的最大值；
    }
}

//----------------归并排序----------------
//---递归合并各个子序列---
void Merge_Sort(List *L, int left, int right)
{
    if (left < right)
    {

        // m is the point where the array is divided into two subarrays
        int mid = (right + left) / 2;

        Merge_Sort(L, left, mid);
        Merge_Sort(L, mid + 1, right);

        // Merge the sorted subarrays
        Merge(L, left, mid, right);
    }
}
//--合并子序列函数---、
void Merge(List *L, int left, int mid, int right)
{
    int n1 = mid - left + 1;
    int n2 = right - mid;
    int i, j, k;
    int l[n1], r[n2];
    for (i = 0; i < n1; i++)
    {
        l[i] = L->data[left + i];
    }
    for (j = 0; j < n2; j++)
    {
        r[j] = L->data[mid + 1 + j];
    }
    i = 0;
    j = 0;
    k = left;
    while (i < n1 && j < n2)
    {
        if (l[i] <= r[j])
        {
            L->data[k] = l[i];
            i++;
        }
        else
        {
            L->data[k] = r[j];
            j++;
        }
        k++;
    }
    while (i < n1)
    {
        L->data[k] = l[i];
        i++;
        k++;
    }
    while (j < n2)
    {
        L->data[k] = r[j];
        j++;
        k++;
    }
}

//---打印排序后内容---
void Print(List *L)
{
    for (int i = 0; i < L->len; i++)
    {
        printf("%d\t", L->data[i]);
    }
}

//---主函数读入数据---
void main()
{
    List L;
    int i = 1;
    InitList(&L);
    int a[MAX];
    do
    {
        scanf("%d", &a[i]);
        int e = a[i];
        InsertList(&L, i, e);
        i++;
    } while (getchar() != '\n');
    Direct_Insertion_Sort(&L); //直接插入排序法
    //Half_Insertion_Sort(&L);         //折半插入排序法
    //QuickSort(&L ,0,L.len-1);       //快速排序
    //Heap_Sort(&L);              //堆排序
    Print(&L);
}