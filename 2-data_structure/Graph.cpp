#include <stdio.h>
#include <stdlib.h>
#include <bits/stdc++.h>

using namespace std;

#define MAX 100		   //�����С
int visited[MAX];	   //���ʱ�־����
typedef int QElemType; //������������
typedef int ElemType;  //������������

//�߱�
typedef struct NODE
{
	int adjvex;		   //�����±�
	int weight;		   //Ȩֵ
	struct NODE *next; //ָ����һ�����
} EdgeNode;

//�����
typedef struct
{
	char name;
	ElemType vertex;	//�����ֵ
	EdgeNode *edgenext; //�߱�
} VertexNode;

//ͼ
typedef struct
{
	VertexNode adjlist[MAX];
	int Vnum; //�������
	int Enum; //�ߵĸ���
} Graph;

//�����ڽӱ�
void CreatGraph(Graph *G)
{
	int vi, vj, w;
	EdgeNode *s;
	printf("please inter the number of Vertex and Edge:");
	scanf("%d %d", &G->Vnum, &G->Enum);
	getchar();
	//��������������ʼ��
	for (int i = 0; i < G->Vnum; i++)
	{
		printf("\nplease inter information of the %d Vertex:", i + 1);
		//scanf("%d %c",&G->adjlist[i].vertex, &G->adjlist[i].name);
		scanf("%c %d", &G->adjlist[i].name, &G->adjlist[i].vertex);
		getchar();
		G->adjlist[i].edgenext = NULL;
	}
	//�����߱�-ǰ�巨
	//printf("\n�����߱�\n");
	printf("Enter the linked vertex subscripts and weights:\n");
	for (int j = 0; j < G->Enum; j++)
	{
		scanf("%d %d %d", &vi, &vj, &w);
		vi -= 1;
		vj -= 1;
		s = (EdgeNode *)malloc(sizeof(EdgeNode));
		s->adjvex = vj;
		s->weight = w;
		s->next = G->adjlist[vi].edgenext;
		G->adjlist[vi].edgenext = s;
		//����ͼ��Ҫ�Գƣ��������߶�Ҫд
		//����ͼ��Ϊ�ڽӱ�����ڽӱ��ڽӱ�ȷ������ĳ��ȣ����ڽӱ�ȷ����������
		//����������ͼ�ڽӱ����ȣ������������ڽӱ���ȣ���Ҫ�ֿ�ʵ��
		//s = (EdgeNode*)malloc(sizeof(EdgeNode));
		//s->adjvex = vi;
		//s->weight = w;
		//s->next = G->adjlist[vj].edgenext;
		//G->adjlist[vj].edgenext = s;
	}
}
//��ʾ���ӱ�
void Print(Graph *G)
{
	printf("Display vertex information:\n");
	for (int i = 0; i < G->Vnum; i++)
	{
		printf("%c ", G->adjlist[i].name);
	}
	printf("\n");
	for (int i = 0; i < G->Vnum; i++)
	{
		EdgeNode *q = G->adjlist[i].edgenext;
		printf("%c(%d)---", G->adjlist[i].name, i + 1);
		while (1)
		{
			if (q == NULL)
			{
				printf("^");
				break;
			}
			printf("(w=%d)->%d--->", q->weight, q->adjvex + 1);
			q = q->next;
		}
		printf("\n");
	}
}

//�ڽӱ�������������
void DFS(Graph *G, int i)
{
	EdgeNode *p;
	visited[i] = 1;
	printf("%c->", G->adjlist[i].name);
	p = G->adjlist[i].edgenext; //��pָ��߱�ĵ�һ�����
	while (p)
	{
		if (!visited[p->adjvex])
		{
			DFS(G, p->adjvex);
		}
		p = p->next;
	}
}
void DFSTraverse(Graph *G)
{
	for (int i = 0; i < G->Vnum; i++)
	{
		visited[i] = 0; //��ʼ���������Ϊ0
	}
	for (int i = 0; i < G->Vnum; i++)
	{
		if (!visited[i])
		{
			DFS(G, i);
		}
	}
}

//������ȱ���
typedef struct
{
	int front;
	int rear;
	int count;
	int data[MAX];
} CirQueue;
void InitQueue(CirQueue *Q)
{
	Q->front = Q->rear = 0;
	Q->count = 0;
}
int QueueEmpty(CirQueue *Q)
{
	return Q->count == 0;
}
void EnQueue(CirQueue *Q, int x)
{
	Q->count++;
	Q->data[Q->rear] = x;
	Q->rear = (Q->rear + 1) % MAX;
}
int DeQueue(CirQueue *Q)
{
	int temp;
	if (QueueEmpty(Q))
	{
		printf("Queue underflow");
		return 0;
	}
	else
	{
		temp = Q->data[Q->front];
		Q->count--;
		Q->front = (Q->front + 1) % MAX;
		return temp;
	}
}
void BFS(Graph *G, int k)
{
	int i;
	CirQueue Q;
	EdgeNode *p;
	InitQueue(&Q);						//���г�ʼ��
	printf("%c->", G->adjlist[k].name); //���ʵ�һ����k
	visited[k] = 1;
	EnQueue(&Q, k); //��k�����ѷ��ʣ���������˶�
	while (!QueueEmpty(&Q))
	{					 //�ӷǿ���ִ��
		i = DeQueue(&Q); //�൱��i����
		p = G->adjlist[i].edgenext;
		while (p)
		{
			if (!visited[p->adjvex])
			{												//��jδ���ʹ�
				printf("%c->", G->adjlist[p->adjvex].name); //����vj
				visited[p->adjvex] = 1;
				EnQueue(&Q, p->adjvex); //���ʹ���vj�˶�
			}
			p = p->next; //��vi����һ�ڽӵ�
		}
	}
}
void BFSTraverse(Graph *G)
{
	int i;
	for (i = 0; i < G->Vnum; i++)
		visited[i] = 0;
	for (i = 0; i < G->Vnum; i++)
		if (!visited[i])
			BFS(G, i);
}

//ͼ����������
void Topological_sort(Graph *G, int n) //n�Ƕ�����
{
	EdgeNode *p;
	int m = 0, j, k;
	int *a = (int *)malloc(n * sizeof(int));
	for (int i = 0; i < n; i++)
	{
		a[i] = 0;
	}
	for (int i = 0; i < n; i++) //ͳ�Ƹ������������������������
	{
		p = G->adjlist[i].edgenext;
		while (p)
		{
			j = p->adjvex;
			a[j]++;
			p = p->next;
		}
	}
	int top = -1;
	for (int i = 0; i < n; i++)
	{
		if (a[i] == 0)
		{
			a[i] = top;
			top = i;
		}
	}
	while (top != -1)
	{
		j = top;
		top = a[top];
		printf("%4d", j + 1);
		m++; //ͳ�ƶ���
		p = G->adjlist[j].edgenext;
		while (p)
		{
			k = p->adjvex; //��l�����ĵ�
			a[k]--;
			if (a[k] == 0)
			{
				a[k] = top;
				top = k;
			}
			p = p->next;
		}
	}
	if (m < n)
		printf("error\n");
	free(a);
}

int main()
{
	Graph G;
	CreatGraph(&G);
	Print(&G);

	printf("\nDFS:\n");
	DFSTraverse(&G);

	printf("\nBFS:\n");
	BFSTraverse(&G);

	int w;
	printf("\nplease inter the num of vertex:");
	scanf("%d", &w);
	Topological_sort(&G, w);

	system("pause");
	return 0;
}